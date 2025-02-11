import { createCanvas, registerFont, loadImage, NodeCanvasRenderingContext2DSettings } from "canvas";
import { readdirSync, writeFile } from "fs";
import { getAllPrinterOptions, printFile } from "node-cups";

class Generator {
  public text: string;
  public price: number;
  public infos: string[];
  public image: string;

  public fonts = {
    medium: "public/Urbanist/static/Urbanist-Medium.ttf",
    semibold: "public/Urbanist/static/Urbanist-SemiBold.ttf",
    bold: "public/Urbanist/static/Urbanist-Bold.ttf",
  };

  constructor(text: string, price: number, infos: string[], image: string) {
    this.text = text;
    this.price = price;
    this.infos = infos;
    this.image = image;
  }

  public async setFonts() {
    registerFont(this.fonts.medium, {
      family: "CustomFontMedium",
      weight: "medium",
    });
    registerFont(this.fonts.bold, { family: "CustomFontBold", weight: "bold" });
    registerFont(this.fonts.semibold, {
      family: "CustomFontSemiBold",
      weight: "semibold",
    });
  }

  public async generate() {

    const canvasWidth = 842;
    const canvasHeight = 595;

    const canvas = createCanvas(canvasWidth, canvasHeight);
    const ctx = canvas.getContext("2d");

    const image = await loadImage(this.image);

    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);

    ctx.font = "24px CustomFontSemiBold";
    ctx.fillStyle = "#111";
    ctx.fillText(this.text, 50, 50);

    ctx.font = "48px CustomFontBold";
    ctx.fillStyle = "#111";
    ctx.fillText(
      this.price.toLocaleString("pt-br", {
        minimumFractionDigits: 2,
        currency: "BRL",
        style: "currency",
      }),
      50,
      135
    );

    ctx.font = "20px CustomFontMedium";
    ctx.fillStyle = "#111";

    for (let i = 0; i < this.infos.length; i++) {
      ctx.fillText(
        `● ${this.infos[i]}`,
        450,
        400 + i * 30 - 30 * this.infos.length
      );
    }

    ctx.drawImage(image, 0, 175, 400, 400);

    const buffer = canvas.toBuffer("image/png");
    const filesLength = readdirSync("public/builds").length;
    const filePath = `public/builds/${filesLength}-image-generated.png`;

    writeFile(filePath, buffer, async (err) => {
      if (err) return console.log("[error] Failed to write image");

      this.print(filePath)
    });
  }

  public async print(filePath: string) {

    const allPrinterOptions = await getAllPrinterOptions();
      const printerName = "L3250-Series";

      const printer = allPrinterOptions.find(
        (printer) => printer.printerName === printerName
      );

      if (!printer) {
        console.log("[error] Printer not found");
        return;
      }

      const printerParams = {
        printer: printer.printerName,
        copies: 1,
        printerOptions: {
          media: "A4",
        },
      };

      await printFile(filePath, printerParams);

      console.log(
        `[system] Printer loading...\n[system] File created successfully: ${filePath}`
      );

  }
}

const ImageGenerator = new Generator(
  "Buscando por um novo condicionador?\nTeste o MayCrene Shampoo por apenas:",
  20.0,
  ["Informação 1", "Informação 2", "Informações 3", "Testando video"],
  "public/images/image-3.png"
);

ImageGenerator.generate();