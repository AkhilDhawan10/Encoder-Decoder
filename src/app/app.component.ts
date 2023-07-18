import { Component } from '@angular/core';
import md5 from 'md5';
import { Buffer } from 'buffer';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'encoder-decoder';
  myfunction(){
    const input = document.getElementById('data') as HTMLInputElement;
    const value = input.value;
    const input2 = document.querySelector('input[name = "value"]:checked') as HTMLInputElement;
    const value2 = input2.value;
    const out1 = document.getElementById('output') as HTMLInputElement;
    switch(value2){
      case 'Base 64 Encode':
        var utf8Encoder = new TextEncoder();
        var inputData = utf8Encoder.encode(value);
        var base64String = btoa(String.fromCharCode(...inputData));
        // alert(base64String);
        out1.value = base64String;
        break;

      case 'Base 64 Decode':
        var decodedString1 = atob(value);
        alert(decodedString1);
        break;

      case 'Base 64URL Encode':
        var utf8Encoder = new TextEncoder();
        var inputData = utf8Encoder.encode(value);
        var base64String = btoa(String.fromCharCode(...inputData));
        var base64URL = base64String
          .replace(/\+/g, '-')
          .replace(/\//g, '_')
          .replace(/=+$/, '');
        alert(base64URL);
        break;

      case 'MD5 Hash':
        function convertToMD5Hash(input: string): string {
          return md5(input);
        }
        var md5Hash = convertToMD5Hash(value);
        alert(md5Hash);
        break;

      case 'Pretty JSON':
        const prettyJSON = JSON.stringify(value, null, 2);
        alert(prettyJSON);
        break;

      case 'Quoted-Printable Encode':
        function quotedPrintableEncode(input: string): string {
          let encodedText = '';
          for (let i = 0; i < input.length; i++) {
            const charCode = input.charCodeAt(i);
            if (charCode > 127 || charCode === 61 || charCode === 32) {
              const hex = charCode.toString(16).toUpperCase();
              encodedText += `=${hex.length === 1 ? '0' + hex : hex}`;
            } else {
              encodedText += input[i];
            }
          }
          return encodedText;
        }
        var encodedText = quotedPrintableEncode(value);
        alert(encodedText);
        break;

      case 'Quoted-Printable Decode':
        function quotedPrintableDecode(input: string): string {
          const regex = /=([0-9A-F]{2})/g;
          const decodedText = input.replace(regex, (_, hex) => String.fromCharCode(parseInt(hex, 16)));
          return decodedText.replace(/=\r\n/g, '');
        }

        var decodedText = quotedPrintableDecode(value);
        alert(decodedText);
        break;

      case 'UTF16 Encode':
        function utf16Encode(input: string): Uint8Array {
          const encoder = new TextEncoder();
          const encodedData = encoder.encode(input);
          return encodedData;
        }
        var decodedText1 = utf16Encode(value);
        alert(decodedText1);
        break;
      
      case 'Hex Decode':
        function hexDecode(input: string): string {
          const buffer = Buffer.from(input, 'hex');
          return buffer.toString();
        }
        var decodedText = hexDecode(value);
        alert(decodedText);
        break;
    }
  }
}
