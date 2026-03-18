import streamlit as st
import streamlit.components.v1 as components
import os

st.set_page_config(layout="wide")

# Correct path for Streamlit Cloud
build_dir = os.path.join(os.path.dirname(__file__), "dist")
html_file = os.path.join(build_dir, "index.html")

if os.path.exists(html_file):
    with open(html_file, "r", encoding="utf-8") as f:
        html_content = f.read()

    components.html(html_content, height=900, scrolling=True)

else:
    st.error("React build not found. Run npm run build.")