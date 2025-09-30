import tkinter as tk
import numpy as np
from tkinter import messagebox

# --- Configuración inicial ---
ROWS, COLS = 6, 7
BASE_VALUES = np.array([
    [40, 70, 120, 200, 120, 70, 40],
    [40, 70, 120, 200, 120, 70, 40],
    [40, 70, 120, 200, 120, 70, 40],
    [40, 70, 120, 200, 120, 70, 40],
    [40, 70, 120, 200, 120, 70, 40],
    [40, 70, 120, 200, 120, 70, 40],
])

board = np.full((ROWS, COLS), " ")  # matriz de fichas (" ", "X", "O")
heuristics = BASE_VALUES.copy()
turn = "X"  # MAX empieza (X)
HV_total = 0

# --- Funciones de heurística ---
def update_heuristics(row, col, player):
    global heuristics, HV_total
    val = BASE_VALUES[row, col]

    if player == "X":  # MAX
        heuristics[row, col] = int(val * 1.5)
    else:  # MIN
        heuristics[row, col] = -val

    # actualizar vecinos inmediatos
    neighbors = [(row-1, col), (row+1, col), (row, col-1), (row, col+1)]
    for r, c in neighbors:
        if 0 <= r < ROWS and 0 <= c < COLS and board[r, c] == " ":
            if player == "X":
                heuristics[r, c] = int(heuristics[r, c] * 1.2)
            else:
                heuristics[r, c] = int(heuristics[r, c] * 0.8)

    HV_total = np.sum(heuristics[board == "X"]) + np.sum(heuristics[board == " "]) + np.sum(heuristics[board == "O"])

def drop_piece(col):
    global turn
    for r in reversed(range(ROWS)):
        if board[r, col] == " ":
            board[r, col] = turn
            update_heuristics(r, col, turn)
            draw_board()
            show_matrix()
            check_winner(r, col, turn)
            turn = "O" if turn == "X" else "X"
            return
    messagebox.showwarning("Columna llena", "Esa columna ya está llena.")

def check_winner(row, col, player):
    directions = [(0,1),(1,0),(1,1),(1,-1)]
    for dr, dc in directions:
        count = 1
        for d in [1,-1]:
            r, c = row, col
            while True:
                r += dr * d
                c += dc * d
                if 0 <= r < ROWS and 0 <= c < COLS and board[r,c] == player:
                    count += 1
                else:
                    break
        if count >= 4:
            messagebox.showinfo("Fin del juego", f"¡Jugador {player} gana!")
            reset_game()
            return

def reset_game():
    global board, heuristics, HV_total, turn
    board = np.full((ROWS, COLS), " ")
    heuristics = BASE_VALUES.copy()
    HV_total = 0
    turn = "X"
    draw_board()
    show_matrix()

# --- Interfaz gráfica ---
root = tk.Tk()
root.title("Conecta 4 con Heurística")

canvas = tk.Canvas(root, width=COLS*80, height=ROWS*80, bg="blue")
canvas.pack()

buttons_frame = tk.Frame(root)
buttons_frame.pack()
for c in range(COLS):
    btn = tk.Button(buttons_frame, text=str(c+1), command=lambda c=c: drop_piece(c))
    btn.grid(row=0, column=c)

text_output = tk.Text(root, height=15, width=80)
text_output.pack()

def draw_board():
    canvas.delete("all")
    for r in range(ROWS):
        for c in range(COLS):
            x1, y1 = c*80, r*80
            x2, y2 = x1+80, y1+80
            canvas.create_oval(x1+5, y1+5, x2-5, y2-5, fill="white")
            if board[r,c] == "X":
                canvas.create_oval(x1+5, y1+5, x2-5, y2-5, fill="red")
            elif board[r,c] == "O":
                canvas.create_oval(x1+5, y1+5, x2-5, y2-5, fill="yellow")

def show_matrix():
    text_output.delete(1.0, tk.END)
    text_output.insert(tk.END, "Matriz heurística actual:\n")
    text_output.insert(tk.END, heuristics)
    text_output.insert(tk.END, f"\n\nHV total: {HV_total}\n")
    text_output.insert(tk.END, f"Turno actual: {turn}\n")

reset_game()
root.mainloop()
