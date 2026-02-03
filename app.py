from flask import Flask, render_template

app = Flask(__name__)

# --- Configuration & Data ---
# In a true Clean Architecture, data would come from a repository/service layer.
# For this scope, we keep it simple but separated in the app file.

# Dynamic Rules Data (passed to Jinja2)
SERVER_RULES = [
    {"id": 1, "title": "No Griefing", "description": "Respect other players' builds. Griefing will result in a ban."},
    {"id": 2, "title": "Be Respectful", "description": "No hate speech, harassment, or toxic behavior in chat."},
    {"id": 3, "title": "No Cheating", "description": "X-ray, fly hacks, and other unfair advantages are strictly prohibited."},
    {"id": 4, "title": "PvP Consent", "description": "PvP is only allowed if both parties agree or in designated arenas."},
    {"id": 5, "title": "No Spamming", "description": "Keep the chat clean. Do not spam messages or commands."}
]

# --- Routes ---

@app.route('/')
def index():
    """
    Renders the Landing Page.
    """
    return render_template('index.html', title="Home")

@app.route('/gallery')
def gallery():
    """
    Renders the Gallery/Features page.
    """
    return render_template('gallery.html', title="Gallery & Features")

@app.route('/rules')
def rules():
    """
    Renders the Dynamic Rules page.
    Passes the SERVER_RULES list to the template.
    """
    return render_template('rules.html', title="Server Rules", rules=SERVER_RULES)

@app.route('/staff')
def staff():
    """
    Renders the Staff/Community page.
    """
    return render_template('staff.html', title="Our Team")

if __name__ == '__main__':
    app.run(debug=True)
