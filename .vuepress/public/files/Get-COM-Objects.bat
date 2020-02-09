:: 获取本机所有`COM`组件对象 by https://www.bajins.com
@findstr /v "^@.* ^:.*" "%~f0"|powershell -&goto:eof

<#
Get-COMObjects by https://github.com/mrpapercut/wscript/tree/master/testfiles/COMobjects
#>
function Get-ComObject {
    param(
        [Parameter(Mandatory = $true,
            ParameterSetName = 'FilterByName')]
        [string]$Filter,
        [Parameter(Mandatory = $true,
            ParameterSetName = 'ListAllComObjects')]
        [switch]$ListAll
    )
    $ListofObjects = Get-ChildItem HKLM:\Software\Classes -ErrorAction SilentlyContinue | 
    Where-Object {
        $_.PSChildName -match '^\w+\.[\w\.]+$' -and (Test-Path -Path "$($_.PSPath)\CLSID")
    } | Select-Object -ExpandProperty PSChildName 
    
    if ($Filter) {
        $ListofObjects | Where-Object { $_ -like $Filter }
    }
    else {
        $ListofObjects
    }
}

# 获取系统版本名称
$filename = (Get-WmiObject -class Win32_OperatingSystem).Caption.Trim() -replace ' ', '_'
$filePath = ".\COMObjects-$($filename).txt"
# 输出到文件
Get-ComObject -ListAll > $filePath
# Get-ComObject -ListAll | Out-File -Encoding "UTF8" $filePath

<#
Get-COMObjects-Members
#>

<# 写内容到Excel #>
function writeExcel ([string]$filePath) {
    $lines = Get-Content $filePath | Where-Object { $_ -notmatch '^\s+$' }

    Write-Host "共有 $($lines.Length) 个COM对象"

    # 通过COM组件访问Excel https://blog.csdn.net/u010288731/article/details/83120205
    $excel = New-Object -ComObject Excel.Application
    $excel.Visible = $True
    $excel.AlertBeforeOverwriting = $False
    $excel.DisplayAlerts = $False
    # 打开一个Excel文档
    # $book = $excel.Workbooks.Open('.\Get-COMObjects-Members.xlsx')
    # 添加一个Excel文档
    $book = $excel.Workbooks.Add()
    # 添加一个工作薄
    # $sheet = $book.Sheets.Add()
    $sheet = $book.Worksheets.Item(1)
    $sheet.Name = "member"
    $range = $sheet.usedRange
    $range.EntireColumn.AutoFit() | out-null

    $lineStyle = "microsoft.office.interop.excel.xlLineStyle" -as [type]
    $colorIndex = "microsoft.office.interop.excel.xlColorIndex" -as [type]
    $borderWeight = "microsoft.office.interop.excel.xlBorderWeight" -as [type]
    # $chartType = "microsoft.office.interop.excel.xlChartType" -as [type]

    for ($b = 1 ; $b -le 3 ; $b++) {
        $sheet.cells.item(1, $b).font.bold = $True
        $sheet.cells.item(1, $b).borders.LineStyle = $lineStyle::xlDashDot
        $sheet.cells.item(1, $b).borders.ColorIndex = $colorIndex::xlColorIndexAutomatic
        $sheet.cells.item(1, $b).borders.weight = $borderWeight::xlMedium
    }

    $sheet.cells.item(1, 1) = "Name"
    $sheet.cells.item(1, 2) = "MemberType"
    $sheet.cells.item(1, 3) = "Definition"

    $x = 2
    foreach ($comobj in $lines) {
        try {
            $info = New-Object -ComObject $comobj | Get-Member
            foreach ($oj in $info) {
                $sheet.cells.item($x, 1) = $oj.Name
                $sheet.cells.item($x, 2) = $oj.MemberType
                $sheet.cells.item($x, 3) = $oj.Definition
                $x++
            }
        }
        catch {
            Write-Host "$comobj`n" + "".PadRight(50, "-") + "`n"
            Write-Warning $_ + "`n"
        }
    }
    # 保存excel
    # $excel.ActiveWorkBook.SaveAs('.\Get-COMObjects-Members.xlsx')
    $excel.SaveAs('.\COMObjects-Members.xlsx')
}

<# 保存内容到CSV文件 #>
function writeCSV ([string]$filePath) {
    $lines = Get-Content $filePath | Where-Object { $_ -notmatch '^\s+$' }

    Write-Host "共有 $($lines.Length) 个COM对象"
    $fp = "COMObjects-Members.csv"
    if (Test-Path $fp) {
        # 文件存在则删除
        Remove-Item $fp
    }
    foreach ($comobj in $lines) {
        try {
            New-Object -ComObject $comobj | Get-Member
            New-Object -ComObject $comobj | Get-Member | ForEach-Object {
                $TypeName = $_.TypeName
                $Name = $_.Name
                $MemberType = $_.MemberType
                $Definition = $_.Definition
                <# 创建自定义对象 https://www.cnblogs.com/tylerzhou/p/10421574.html #>
                [PSCustomObject]@{
                    Object     = $comobj
                    TypeName   = $TypeName
                    Name       = $Name
                    MemberType = $MemberType
                    Definition = $Definition
                }
            } | Export-Csv $fp -UseCulture -NoTypeInformation -Encoding UTF8 -Append
        }
        catch {
            Write-Host "$comobj`n" + "".PadRight(50, "-") + "`n"
            Write-Warning $_ + "`n"
        }
    }
}

<# 保存内容到文本 #>
function writeTXT ([string]$filePath) {
    $lines = Get-Content $filePath | Where-Object { $_ -notmatch '^\s+$' }

    Write-Host "共有 $($lines.Length) 个COM对象"

    $fp = ".\COMObjects-Members.txt"

    Write-Host > $fp

    foreach ($comobj in $lines) {
        $out = "$comobj`n" + "".PadRight(50, "-")
        try {
            $out | Out-File -Encoding "UTF8" -Append $fp
            New-Object -ComObject $comobj | Get-Member | Out-File -Encoding "UTF8" -Append $fp
        }
        catch {
            Write-Host  $out + "`n"
            Write-Warning $_ + "`n"
        }
    }
}

writeTXT $filePath
