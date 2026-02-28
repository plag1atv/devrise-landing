from flask import Blueprint, render_template, request, redirect, url_for

main_bp = Blueprint("main", __name__)


@main_bp.get("/")
def index():
    return render_template("index.html")


@main_bp.post("/lead")
def lead():
    name = request.form.get("name", "").strip()
    email = request.form.get("email", "").strip()
    level = request.form.get("level", "").strip()
    goal = request.form.get("goal", "").strip()

    # простая проверка (демо)
    if not name or not email:
        return redirect(url_for("main.index"))

    return render_template("thanks.html", name=name, level=level, goal=goal)