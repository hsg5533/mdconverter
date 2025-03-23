const markdownTextarea = document.getElementById("markdown");
const outputDiv = document.getElementById("output");
const previewDiv = document.getElementById("preview");
const convertBtn = document.getElementById("convert");
const copyBtn = document.getElementById("copy");
const downloadHtmlButton = document.getElementById("downloadHtmlButton");

// "HTML로 변환하기" 버튼
convertBtn.addEventListener("click", () => {
  const markdownText = markdownTextarea.value;
  const html = marked.parse(markdownText);
  outputDiv.textContent = html; // HTML 코드 표시
  previewDiv.innerHTML = html; // 미리보기 렌더링
});

// "HTML 코드 복사하기" 버튼
copyBtn.addEventListener("click", () => {
  const htmlCode = outputDiv.textContent;
  navigator.clipboard.writeText(htmlCode).then(() => {
    alert("HTML 코드가 복사되었습니다!");
  });
});

// "HTML 파일로 다운받기" 버튼 (변환된 HTML만 다운로드)
downloadHtmlButton.addEventListener("click", () => {
  const convertedHtml = outputDiv.textContent;
  const finalHtml = `
<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8"/>
  <title>Converted Markdown</title>
</head>
<body>
${convertedHtml}
</body>
</html>
`.trim();

  const blob = new Blob([finalHtml], { type: "text/html" });
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = "converted.html";
  link.click();

  URL.revokeObjectURL(url);
});
