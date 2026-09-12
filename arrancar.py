#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Arranca el servidor local de Estribor (http://localhost:3050).

Uso:
  - Doble clic sobre este archivo, o
  - `python arrancar.py`

El servidor queda corriendo en esta ventana. Para pararlo: Ctrl+C
(o simplemente cierra la ventana).
"""

import os
import socket
import subprocess
import sys
import threading
import time
import webbrowser

HOST = "localhost"
PORT = 3050
URL = f"http://{HOST}:{PORT}"

# Directorio donde vive este script (la raíz del proyecto).
DIR = os.path.dirname(os.path.abspath(__file__))


def puerto_ocupado() -> bool:
    """Devuelve True si ya hay algo escuchando en localhost:3050."""
    with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
        s.settimeout(0.5)
        return s.connect_ex((HOST, PORT)) == 0


def abrir_navegador() -> None:
    """Abre el navegador unos segundos después, cuando el servidor ya arrancó."""
    time.sleep(4)
    webbrowser.open(URL)


def main() -> None:
    # Evita errores de acentos en la consola de Windows.
    try:
        sys.stdout.reconfigure(encoding="utf-8")
    except Exception:
        pass

    os.chdir(DIR)

    print("=" * 52)
    print("  Estribor · arranque local")
    print("=" * 52)
    print()

    # Si ya está corriendo, no levantamos un segundo servidor.
    if puerto_ocupado():
        print(f"El servidor ya está corriendo en {URL}.")
        print("Abriendo el navegador…")
        webbrowser.open(URL)
        return

    print(f"Arrancando el servidor en {URL} …")
    print("No cierres esta ventana. Para parar: Ctrl+C.")
    print()

    threading.Thread(target=abrir_navegador, daemon=True).start()

    try:
        # `shell=True` resuelve correctamente `npm` (npm.cmd) en Windows.
        subprocess.run("npm run dev", shell=True, cwd=DIR)
    except KeyboardInterrupt:
        print("\nServidor detenido.")
    except FileNotFoundError:
        print("No se encontró npm. Instala Node.js desde https://nodejs.org")
        input("Pulsa Enter para salir…")


if __name__ == "__main__":
    main()
