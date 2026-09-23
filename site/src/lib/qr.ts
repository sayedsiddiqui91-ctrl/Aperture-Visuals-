import "server-only";
import QRCode from "qrcode";

/** Inline SVG QR code, generated at build time (no third-party QR service). */
export async function qrSvg(text: string, dark = "#082c2e") {
  return QRCode.toString(text, { type: "svg", margin: 0, errorCorrectionLevel: "M", color: { dark, light: "#0000" } });
}
