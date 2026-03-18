import streamlit as st
import streamlit.components.v1 as components
import os

st.set_page_config(layout="wide")

# Path to React build folder
build_dir = os.path.join(os.getcwd(), "dist")

index_file = os.path.join(build_dir, "index.html")

# Read index.html
with open(index_file, "r", encoding="utf-8") as f:
    html = f.read()

# Fix asset paths for Streamlit
html = html.replace('src="/', 'src="./')
html = html.replace('href="/', 'href="./')

# Show React app
components.html(html, height=900, scrolling=True)