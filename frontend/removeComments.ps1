$jsxFiles = Get-ChildItem -Path "src" -Recurse -Include "*.jsx", "*.js"

foreach ($file in $jsxFiles) {
    Write-Host "Removing comments from $($file.FullName)"
    
    # Read the file content
    $content = Get-Content $file.FullName -Raw
    
    # Remove JSX comments
    $newContent = $content -replace "\{\/\*.*?\*\/\}", ""
    
    # Remove regular JS comments that start with // 
    $lines = $newContent -split "`r`n"
    $filteredLines = $lines | Where-Object { $_ -notmatch "^\s*// " }
    $finalContent = $filteredLines -join "`r`n"
    
    # Write the modified content back to the file
    $finalContent | Set-Content "$($file.FullName).new"
    Move-Item -Force "$($file.FullName).new" $file.FullName
}

Write-Host "Finished removing comments from all JSX files in the src directory" 