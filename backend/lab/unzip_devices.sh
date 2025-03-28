#!/bin/bash

# Find all .zip files under the devices directory
find devices -type f -name "*.zip" | while read -r zipfile; do
  # Get the target directory (same as the zip file's directory)
  target_dir=$(dirname "$zipfile")
  
  # Extract the base filename without the .zip extension
  base_name=$(basename "$zipfile" .zip)
  
  # Unzip the file into the target directory, flattening paths (-j)
  # and renaming the extracted content to match the zip's base name
  unzip -j -d "$target_dir" "$zipfile" -x "__MACOSX*" "*.DS_Store" 2>/dev/null
  
  # Rename all extracted files to the base name (if multiple files, adjust logic)
  # This assumes the zip contains a single file
  extracted_file=$(unzip -Z1 "$zipfile" | head -n1 | xargs -I{} basename {})
  if [ -f "$target_dir/$extracted_file" ] && [ "$extracted_file" != "$base_name" ]; then
    mv -f "$target_dir/$extracted_file" "$target_dir/$base_name"
  fi

  # Optional: Delete the original zip file after extraction
  # rm "$zipfile"
done
