import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup ,ReactiveFormsModule} from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-qrcode',
  templateUrl: './qrcode.component.html',
  styleUrls: ['./qrcode.component.css']
})
export class QrcodeComponent implements OnInit {
  qrCodeForm: FormGroup = new FormGroup({}); // Initialize as empty FormGroup

  qrCodeData: string = '';

  constructor(private fb: FormBuilder, private http: HttpClient) { }

  ngOnInit(): void {
    this.qrCodeForm = this.fb.group({
      link: [''] 
    });
  }

  async generateQRCode() {
    const linkValue = this.qrCodeForm.get('link')?.value;

    if (linkValue) {
      try {
        const response: any = await this.http.post('http://localhost:8081/generate-qrcode', { link: linkValue }).toPromise();
        this.qrCodeData = response?.qrCodeData;
      } catch (error) {
        console.error('Error generating QR code:', error);
       
      }
    } else {
      console.error('Link value is null or undefined');
     
    }
  }
}
