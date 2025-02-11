
# Gerador de Imagens e Impressão 🎨🖨️

Este projeto é um gerador de imagens que combina texto, informações e imagens em um layout e, em seguida, envia a imagem gerada para impressão em uma impressora específica feito especialmente como uma ideia para maycrene cosmeticos.

## Funcionalidade 🚀

1. **Gerar Imagem**: O código gera uma imagem utilizando texto, preço, informações adicionais e uma imagem de fundo.
2. **Personalização de Fonte**: As fontes podem ser personalizadas, e o código registra três tipos de fontes para diferentes estilos de texto.
3. **Impressão**: Após a geração da imagem, o arquivo é enviado para a impressora especificada utilizando o protocolo do CUPS.

## Estrutura do Código 🧩

O código é dividido em uma classe `Generator` que é responsável por:

- **Definir Fontes**: As fontes são carregadas no início, permitindo que os textos sejam renderizados com o estilo desejado.
- **Gerar Imagem**: Uma imagem em formato PNG é gerada com base nas informações fornecidas, incluindo o texto, preço e imagem de fundo.
- **Impressão**: A imagem gerada é enviada para a impressora conectada através do CUPS.

## Dependências 📦

- `canvas`: Utilizado para criação e manipulação de imagens.
- `node-cups`: Utilizado para interação com impressoras via CUPS.
- `fs`: Para leitura de arquivos e manipulação de diretórios.

## Como Usar 📝

1. **Instalar Dependências**:

   Execute o seguinte comando para instalar as dependências necessárias:

   ```bash
   npm install
   ```

2. **Configuração de Fontes**:

   As fontes necessárias devem estar no diretório `public/Urbanist/static/`. Certifique-se de que as fontes `Urbanist-Medium.ttf`, `Urbanist-SemiBold.ttf` e `Urbanist-Bold.ttf` estão presentes neste diretório.

3. **Gerar Imagem**:

   Para gerar a imagem, basta instanciar a classe `Generator` e chamar o método `generate()`, passando o texto, preço, informações adicionais e o caminho da imagem de fundo. O código já contém um exemplo de uso.

   Exemplo de instância do `Generator`:

   ```ts
   const ImageGenerator = new Generator(
     "Buscando por um novo shampoo?\nTeste o MayCrene Shampoo por apenas:",
     20.0,
     ["Informação 1", "Informação 2", "Informações 3", "Testando video"],
     "public/images/image-3.png"
   );

   ImageGenerator.generate();
   ```

4. **Impressão**:

   Após a geração da imagem, ela será automaticamente enviada para a impressora configurada. O nome da impressora é `"L3250-Series"`, mas você pode alterar para qualquer outro modelo se necessário.

## Exemplo de Saída 🖼️

O código gerará uma imagem como a seguinte (com base nos parâmetros fornecidos):

- Texto: `"Buscando por um novo condicionador?
Teste o MayCrene Shampoo por apenas:"`
- Preço: `R$ 20,00`
- Informações adicionais:
  - `"Informação 1"`
  - `"Informação 2"`
  - `"Informações 3"`
  - `"Testando video"`
- Imagem de fundo: `"public/images/image-3.png"`

## Observações ⚠️

- A geração da imagem é realizada com um tamanho de tela de 842x595 pixels (tamanho A4).
- A impressão é realizada utilizando a impressora configurada no sistema, e o arquivo gerado é salvo no diretório `public/builds/`.
