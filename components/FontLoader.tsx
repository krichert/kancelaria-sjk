export default function FontLoader() {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH?.trim() || "";
  const fontPath = basePath
    ? `/${basePath.replace(/^\/+|\/+$/g, "")}/fonts`
    : "/fonts";

  return (
    <style
      dangerouslySetInnerHTML={{
        __html: `
          @font-face {
            font-family: 'Cocomat Pro';
            src: url('${fontPath}/cocomat-pro-regular.eot');
            src: url('${fontPath}/cocomat-pro-regular.eot?#iefix') format('embedded-opentype'),
                 url('${fontPath}/cocomat-pro-regular.woff2') format('woff2'),
                 url('${fontPath}/cocomat-pro-regular.woff') format('woff');
            font-weight: 300 500;
            font-style: normal;
            font-display: swap;
          }
        `,
      }}
    />
  );
}
