import React, { useState, useEffect } from 'react';
import './JogoDaVelha.css';

var contador = 0
var jogadorX = 0
var jogadorO = 0
var empate = 0

function JogoDaVelha() {
  
  const tabuleiroVazio = Array(9).fill('');

  const [tabuleiro, setTabuleiro] = useState(tabuleiroVazio);
  
  const [jogadorAtual, setJogadorAtual] = useState('O');

  const [ganhador, setGanhador] = useState(null)  

  const clickQuadrado = (index) => {

    if(ganhador !== null) return null
    
    if(tabuleiro[index] !== '') return null
    
    setTabuleiro(tabuleiro.map((item, itemIndex) => itemIndex === index ? jogadorAtual: item))

    setJogadorAtual(jogadorAtual === 'X' ? 'O': 'X')
  }

  const verificaVitoria = () => {
      const possibilidadesDeVitoria = [
        [tabuleiro[0], tabuleiro[1], tabuleiro[2]],
        [tabuleiro[3], tabuleiro[4], tabuleiro[5]],
        [tabuleiro[6], tabuleiro[7], tabuleiro[8]],

        [tabuleiro[0], tabuleiro[3], tabuleiro[6]],
        [tabuleiro[1], tabuleiro[4], tabuleiro[7]],
        [tabuleiro[2], tabuleiro[5], tabuleiro[8]],

        [tabuleiro[0], tabuleiro[4], tabuleiro[8]],
        [tabuleiro[2], tabuleiro[4], tabuleiro[6]]
      ]

    possibilidadesDeVitoria.forEach(linhas => {
      if(contador === 9) {
        verificaEmpate()
      }else if(linhas.every(linha => linha === 'X')){
        setGanhador('X')
      }else if (linhas.every(linha => linha === 'O')){
        setGanhador('O')  
      }
    })
    contador = contador + 1
    atualizaPlacar()
  }


  const verificaEmpate = () => {
    setGanhador('E')
  }

  const atualizaPlacar = () => {
    if(ganhador === 'X'){
      jogadorX = jogadorX + 1
      var placarX = document.querySelector('.jogadorX')
      placarX.innerText= jogadorX
    }else if(ganhador === 'O'){
      jogadorO = jogadorO + 1
      var placarO = document.querySelector('.jogadorO')
      placarO.innerText= jogadorO
    }else if(ganhador === 'E'){
      empate = empate + 1
      var placarE = document.querySelector('.jogadorEmpate')
      placarE.innerText = empate
    }
  }

  const reiniciaTabuleiro = () => {
    setTabuleiro(tabuleiroVazio)
    setJogadorAtual(ganhador === 'E' ? 'O' : ganhador)
    setGanhador(null)
    contador = 0
  }

  const reiniciaJogo = () => {
    reiniciaTabuleiro()
    jogadorX = 0
    jogadorO = 0
    empate = 0
    var placarX = document.querySelector('.jogadorX')
    placarX.innerText= jogadorX
    var placarO = document.querySelector('.jogadorO')
    placarO.innerText= jogadorO
    var placarE = document.querySelector('.jogadorEmpate')
    placarE.innerText = empate 
  }

  
  useEffect(verificaVitoria)

  return (
    <main>
      <h1>Jogo da velha</h1>
      <div className={`quadrado ${ganhador ? 'game-over': ''}`}>
        {tabuleiro.map((item, index) => (
          <div
            key={index}
            className={`quadrados ${item}`}
            onClick={() => clickQuadrado(index)}
          >
              {item}
            </div>

        ))}

      </div>
      {ganhador &&
      <footer>
        {
          ganhador === 'E' ?
          <h2 className="mensagem-vencedora">
            <span
              className={ganhador}
            >O jogo empatou!
            </span>
            </h2>
            :
            <h2 className="mensagem-vencedora">
              <span className={ganhador}>
                  {ganhador} ganhou!
              </span>
            </h2>
        }

        <div className="placar-e-botoes">
          <div className="placar">
            <table className="tabela">
              <thead>
                <tr>
                  <th className="X">Jogador X</th>
                  <th className="O">Jogador O</th>
                  <th className="empate">Empate</th>
                </tr>
              </thead>
              <tbody className="corpo-placar">
                <tr>
                  <td className="jogadorX">{jogadorX}</td>
                  <td className="jogadorO">{jogadorO}</td>
                  <td className="jogadorEmpate">{empate}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="botoes">
            <button className="reinicia-tabuleiro" onClick={() => reiniciaTabuleiro()}>Reiniciar Tabuleiro</button>
            <button className="reinicia-jogo" onClick={() => reiniciaJogo()}>Reiniciar Jogo</button>
          </div>  
        </div>

      </footer>
      }
    </main>
  );
}

export default JogoDaVelha;
