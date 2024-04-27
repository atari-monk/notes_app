param (
    [switch]$useFull = $false,
    [switch]$useTest = $false,
    [switch]$useMisc = $false
)

. "./../../scripts/src_ps1/npm.ps1"

$repoPath = "C:\atari-monk\Code\notes_app\"
$libFolder = "data_lib"
$libName = "data_lib"

$build = "$libFolder\build\"
$pack = "$libName-1.0.0.tgz"
$lib = Join-Path $repoPath ($build + $pack)

$workingList = @(
    "ui_lib",
    "server",
    "editor",
    "reader",
    "page",
    "personal_page"
)

$fullList = @(
    
)

$testList = @(
   
)

$miscList = @(
)

$targetProjects = if ($useTest) { $testList } elseif ($useFull) { $fullList } elseif ($useMisc) { $miscList } else { $workingList }
$targetProjects = $targetProjects | ForEach-Object { Join-Path $repoPath $_ }

Write-Output ("Using {0} list" -f $(if ($useTest) { "test" } elseif ($useFull) { "full" }  elseif ($useMisc) { "misc" } else { "working" }))

try {
    Build-Lib
    if (-not (Assert-Lib -libPath $lib)) {
        return
    }
    foreach ($targetProj in $targetProjects) {
        $copyParams = @{
            packPath = $lib
            projDir  = $targetProj
            packName = $pack
        }
        Write-Output $copyParams
        Install-Pack @copyParams
    }
    Write-Output "Script execution completed successfully."
}
catch {
    Write-Error "An error occurred: $_"
}
