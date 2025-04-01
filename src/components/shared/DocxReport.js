import Docxtemplater from "docxtemplater";
import PizZip from "pizzip";
import PizZipUtils from "pizzip/utils/index.js";
import { saveAs } from "file-saver";
import expressionParser from "docxtemplater/expressions.js";
expressionParser.filters.toFixed = function (input, precision) {

  if (!input) {
    return input;
  }

  return input.toFixed(precision);
};
function loadFile(url, callback) {
  PizZipUtils.getBinaryContent(url, callback);
}
let host = 't.wtsolutions.cn'
if (host == window.location.host) {
  host = 'https://t.wtsolutions.cn/'
} else {
  host = 'http://localhost:5173/'
}


export default {
  methods: {
    renderDoc(unit, data, callback) {
      loadFile(`${host}${unit}.docx`, function (
        error,
        content
      ) {
        if (error) {
          callback({ error: 'error' })
        }
        try {

          const zip = new PizZip(content);
          const doc = new Docxtemplater(zip, { paragraphLoop: true, linebreaks: true, parser: expressionParser, });
          doc.render(data);

          const out = doc.getZip().generate({
            type: "blob",
            mimeType:
              "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
          });
          saveAs(out, `${unit}.docx`);
          callback({ success: 'success' })
        }
        catch (e) {
          console.log(e)
          callback({ error: 'error' })
        }

      });
    }
  },
};
