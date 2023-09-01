#!/bin/bash

# Directory paths from the src directory
COMPONENTS_DIR="./components"
TERMINAL_DIR="./components/Terminal"

# Check if the directories exist
if [ ! -d "$COMPONENTS_DIR" ]; then
    echo "$COMPONENTS_DIR does not exist. Exiting script."
    exit 1
fi

if [ ! -d "$TERMINAL_DIR" ]; then
    echo "$TERMINAL_DIR does not exist. Exiting script."
    exit 1
fi

# File creation and content pasting

# ChatGPT.tsx in components directory
FILE_PATH="$COMPONENTS_DIR/ChatGPT.tsx"
if [ ! -f "$FILE_PATH" ]; then
    cat > "$FILE_PATH" <<EOL
import React from 'react';

const ChatGPT = () => {
    return (
        <div>
            This is the ChatGPT component.
        </div>
    );
}

export default ChatGPT;
EOL
    echo "File $FILE_PATH created."
else
    echo "File $FILE_PATH already exists."
fi

# GPTStyles.css in components/Terminal directory
FILE_PATH="$TERMINAL_DIR/GPTStyles.css"
if [ ! -f "$FILE_PATH" ]; then
    cat > "$FILE_PATH" <<EOL
/* Add your CSS styles here */
body {
    background-color: black;
}
EOL
    echo "File $FILE_PATH created."
else
    echo "File $FILE_PATH already exists."
fi
