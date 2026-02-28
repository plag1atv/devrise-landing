import os
from flask import Flask


def create_app():
    base_dir = os.path.dirname(os.path.abspath(__file__))

    app = Flask(
        __name__,
        static_url_path="/static",
        static_folder=os.path.join(base_dir, "static"),
        template_folder=os.path.join(base_dir, "templates"),
    )

    app.config["SECRET_KEY"] = "devrise-secret-key"

    from .routes import main_bp
    app.register_blueprint(main_bp)

    return app