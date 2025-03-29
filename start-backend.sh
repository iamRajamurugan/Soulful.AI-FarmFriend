
#!/bin/bash
cd backend
echo "Installing dependencies..."
pip install -r requirements.txt
echo "Starting server..."
python main.py
