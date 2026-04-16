@echo off
title SOMA Produtora — Demo
echo.
echo  ┌─────────────────────────────────────┐
echo  │   SOMA Produtora — Abrindo demo...  │
echo  └─────────────────────────────────────┘
echo.

:: Vai para a pasta do script
cd /d "%~dp0"

:: Verifica se Python está instalado
python --version >nul 2>&1
if %errorlevel% neq 0 (
    python3 --version >nul 2>&1
    if %errorlevel% neq 0 (
        echo  Python nao encontrado.
        echo  Baixe em: https://www.python.org/downloads/
        echo  Marque a opcao "Add Python to PATH" ao instalar.
        pause
        exit
    )
    set PYTHON=python3
) else (
    set PYTHON=python
)

:: Abre o navegador após 2 segundos
echo  Iniciando servidor local na porta 8080...
start "" /b cmd /c "timeout /t 2 /nobreak >nul && start http://localhost:8080/index-demo.html"

:: Inicia o servidor (mantém aberto)
echo  Servidor rodando. Feche esta janela para encerrar o demo.
echo.
%PYTHON% -m http.server 8080
