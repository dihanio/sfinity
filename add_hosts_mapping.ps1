# Script untuk mengonfigurasi hosts file secara otomatis.
# Menghapus mapping lama 127.0.0.1 dan menambahkan mapping ke IP publik Cloudflare.
# Harap jalankan script ini dengan klik kanan -> "Run with PowerShell" (sebagai Administrator).

$hostsPath = "C:\Windows\System32\drivers\etc\hosts"
$oldMappings = @(
    "127.0.0.1 sfinity.ryuzen.my.id",
    "127.0.0.1 api-sfinity.ryuzen.my.id"
)
$newMappings = @(
    "104.21.55.148 sfinity.ryuzen.my.id",
    "104.21.55.148 api-sfinity.ryuzen.my.id"
)

# Cek apakah script dijalankan sebagai Administrator
$isAdmin = ([Security.Principal.WindowsPrincipal][Security.Principal.WindowsIdentity]::GetCurrent()).IsInRole([Security.Principal.WindowsBuiltInRole]::Administrator)

if (-not $isAdmin) {
    Write-Host "==========================================================" -ForegroundColor Red
    Write-Host "ERROR: Harap jalankan script ini sebagai Administrator!" -ForegroundColor Red
    Write-Host "Caranya: Klik kanan file ini -> 'Run with PowerShell'" -ForegroundColor Red
    Write-Host "==========================================================" -ForegroundColor Red
    Read-Host "Tekan Enter untuk keluar..."
    exit
}

try {
    # Hapus atribut read-only jika ada
    if ((Get-Item $hostsPath).IsReadOnly) {
        Set-ItemProperty -Path $hostsPath -Name IsReadOnly -Value $false
        Write-Host "Menghapus atribut Read-Only pada hosts file." -ForegroundColor Yellow
    }

    # 1. Bersihkan mapping 127.0.0.1 lama jika ada
    $content = [System.IO.File]::ReadAllLines($hostsPath)
    $changed = $false
    $newContent = [System.Collections.Generic.List[string]]::new()

    foreach ($line in $content) {
        $shouldKeep = $true
        foreach ($old in $oldMappings) {
            if ($line.Trim() -eq $old) {
                $shouldKeep = $false
                $changed = $true
                Write-Host "Menghapus mapping lama: $old" -ForegroundColor Yellow
            }
        }
        if ($shouldKeep) {
            $newContent.Add($line)
        }
    }

    if ($changed) {
        [System.IO.File]::WriteAllLines($hostsPath, $newContent)
        Write-Host "Mapping lama berhasil dihapus." -ForegroundColor Green
    }

    # 2. Tambahkan mapping Cloudflare IP baru
    # Muat ulang konten file setelah kemungkinan perubahan di atas
    $currentContent = [System.IO.File]::ReadAllLines($hostsPath)
    $linesToWrite = [System.Collections.Generic.List[string]]::new($currentContent)
    $hasAdded = $false

    foreach ($mapping in $newMappings) {
        $found = $false
        foreach ($line in $currentContent) {
            if ($line.Trim() -eq $mapping) {
                $found = $true
                break
            }
        }
        if (-not $found) {
            $linesToWrite.Add($mapping)
            $hasAdded = $true
            Write-Host "Berhasil menambahkan mapping baru: $mapping" -ForegroundColor Green
        } else {
            Write-Host "Mapping sudah ada: $mapping" -ForegroundColor Yellow
        }
    }

    if ($hasAdded) {
        [System.IO.File]::WriteAllLines($hostsPath, $linesToWrite)
    }

    Write-Host "==========================================================" -ForegroundColor Green
    Write-Host "Selesai! Silakan refresh/reload browser Anda." -ForegroundColor Green
    Write-Host "==========================================================" -ForegroundColor Green
}
catch {
    Write-Host "Terjadi kesalahan saat mengupdate hosts file: $_" -ForegroundColor Red
    Write-Host "Pastikan antivirus atau Windows Defender tidak memblokir modifikasi hosts file." -ForegroundColor Yellow
}

Read-Host "Tekan Enter untuk keluar..."
