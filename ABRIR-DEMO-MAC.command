#!/bin/bash

# Vai para a pasta do script
cd "$(dirname "$0")"

echo ""
echo " ┌─────────────────────────────────────┐"
echo " │   SOMA Produtora — Abrindo demo...  │"
echo " └─────────────────────────────────────┘"
echo ""

# Verifica se Python está instalado
if command -v python3 &>/dev/null; then
    PYTHON=python3
elif command -v python &>/dev/null; then
    PYTHON=python
else
    echo " Python não encontrado."
    echo " Instale pelo terminal: xcode-select --install"
    read -p " Pressione Enter para sair..."
    exit 1
fi

echo " Iniciando servidor local na porta 8080..."

# Abre o navegador após 2 segundos
(sleep 2 && open "http://localhost:8080/index-demo.html") &

echo " Servidor rodando. Feche esta janela para encerrar o demo."
echo ""

# Inicia o servidor
$PYTHON -m http.server 8080
