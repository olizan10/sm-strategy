# sm-strategy
Estrategia para compra de crypto, usando contagem de Heikin-Ashi. 

Como a binance não fornece o tipo de vela Heikin-Ashi, primeiro fazemos a conversão.

Analise consiste em observar uma baixa seguido de um Heikin-Ashi positovo, se naquele momento o volume confirmar 
uma possivel reversao o sinal de antrada é disparado.


Instalação
npm install

exec
npm start
