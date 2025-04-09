$jsFiles = Get-ChildItem -Path "src" -Recurse -Include "*.js"

foreach ($file in $jsFiles) {
    Write-Host "Removing comments from $($file.FullName)"
    $content = Get-Content $file.FullName
    $newContent = $content | Where-Object { $_ -notmatch "^// " }
    $newContent | Set-Content "$($file.FullName).new"
    Move-Item -Force "$($file.FullName).new" $file.FullName
}

Write-Host "Finished removing comments from all JS files in the src directory" 