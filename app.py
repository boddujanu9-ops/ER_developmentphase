import streamlit as st
import streamlit.components.v1 as components
import os

# path to built frontend
build_dir = "dist"
index_file = os.path.join(build_dir, "index.html")

# load HTML
with open(index_file, "r", encoding="utf-8") as f:
    html_data = f.read()

# display frontend
components.html(html_data, height=800, scrolling=True)