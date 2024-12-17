Esse é um projeto de estágio realizado com um total de 360 horas, efetuado no IFRS Campus Feliz.


O frontend foi desenvolvido em [NextJS](https://nextjs.org/) com auxilio das seguintes tecnologias.

- [TailwindCSS](https://tailwindcss.com/)
- [ShadcnUI](https://ui.shadcn.com/)

## Como funciona?

Para iniciar esse projeto, siga os seguintes passos.

```U
#Utilizar os comandos dentro da pasta raíz, exemplos: mostra-tecnica/frontend
npm install

# Se deseja executar a aplicação de maneira local, afins de teste.
npm run dev

# Caso deseja fazer o upload em uma VPS, utilize:
npm run build
npm run start
```

Quando a aplicação está ligada de modo local, ele funciona no caminho: [http://localhost:3000](http://localhost:3000)

Para o projeto funcionar, é necessário que o backend da aplicação esteja ligado, você pode encontrar mais sobre o repositório no no meu [GitHub](https://github.com/devvieiira/mostra-tecnica-backend).


## Como interligar o frontend com o backend?

Se você já possui o backend em sua máquina, basta interligado pelo arquivo _.env_ , colocando o caminho ou a url do seu backend.

Exemplo:
```
# Arquivo .env

NEXT_PUBLIC_URL="Sua URL vai aqui"
```

Lembre-se, que o backend também precisa conter a _URL_ do frontend para o funcionamento do sistema.


