import streamlit as st
import streamlit.components.v1 as components
import os

# Path to React build
build_dir = os.path.join(os.getcwd(), "dist")

html_file = os.path.join(build_dir, "index.html")

# Read React index.html
with open(html_file, "r", encoding="utf-8") as f:
    html_content = f.read()

# Display inside Streamlit
components.html(html_content, height=800, scrolling=True)