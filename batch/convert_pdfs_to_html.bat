@echo off
setlocal

set "PDF_DIR=C:\Users\thatt\OneDrive\Desktop\kriyadocs\proofset\pdf"
set "HTML_DIR=C:\Users\thatt\OneDrive\Desktop\kriyadocs\proofset\html"

if not exist "%HTML_DIR%" mkdir "%HTML_DIR%"

for %%f in ("%PDF_DIR%\*.pdf") do (
    set "PDF_FILE=%%~ff"
    set "HTML_FILE=%HTML_DIR%\%%~nf.html"
    echo Processing %%~nf.pdf to %%~nf.html
    docker run -ti --rm -v "%PDF_DIR%:/pdf" -v "%HTML_DIR%:/html" -w /pdf pdf2htmlex/pdf2htmlex:0.18.8.rc2-master-20200820-alpine-3.12.0-x86_64 %%~nf.pdf /html/%%~nf.html
)

endlocal
pause
