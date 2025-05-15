interface OcrField {
  label: string;
  ocr_text: string;
}

interface OcrPrediction {
  prediction: OcrField[];
}

interface OcrResponse {
  result: OcrPrediction[];
}

export default OcrResponse;
