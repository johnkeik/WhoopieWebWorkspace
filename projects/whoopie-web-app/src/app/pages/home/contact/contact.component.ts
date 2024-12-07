import { Component, OnInit } from '@angular/core';
import { InputComponent } from '../../../shared/input/input.component';
import { ComingSoonComponent } from '../../../shared/coming-soon/coming-soon.component';
import { TranslocoDirective } from '@jsverse/transloco';
import emailjs from '@emailjs/browser';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [
    CommonModule,
    InputComponent,
    ComingSoonComponent,
    TranslocoDirective,
    ReactiveFormsModule,
  ],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss',
})
export class ContactComponent implements OnInit {
  formIsInvalid = false;
  loading = false;
  contactForm = new FormGroup({
    name: new FormControl('', Validators.required),
    email: new FormControl(
      '',
      Validators.compose([Validators.required, Validators.email])
    ),
    message: new FormControl('', Validators.required),
  });

  validationMessages: any = {
    name: { required: 'Dont leave me like that, give me a name!' },
    email: {
      required: 'I need an email, to get back to you!',
      invalid: "I'll keep it here till you type it properly.",
    },
    message: { required: 'Tell me something, I am bad at guessing!' },
  };
  successMessage = "Congrats, we'll be in touch";
  errorMessage =
    'Ooops, something went wrong! Please try again or try sending me an email by clicking on the emmail above.';
  response: 'success' | 'error' | undefined;

  get name() {
    return this.contactForm.controls['name'];
  }
  get email() {
    return this.contactForm.controls['email'];
  }
  get message() {
    return this.contactForm.controls['message'];
  }

  get emailError() {
    if (this.email.invalid) {
      if (this.email.hasError('required')) {
        return this.validationMessages.email.required;
      } else {
        return this.validationMessages.email.invalid;
      }
    } else {
      return undefined;
    }
  }
  ngOnInit(): void {}

  submit() {
    this.response = undefined;
    this.formIsInvalid = !this.contactForm.valid;

    if (!this.formIsInvalid) {
      this.loading = true;
      this.sendEmail();
    }
  }

  public sendEmail() {
    emailjs
      .send(
        'service_g1nnhkh',
        'template_vhxmufq',
        {
          name: this.name.value ?? '',
          email: this.email.value ?? '',
          message: this.message.value ?? '',
        },
        'PypZCPrV96IWEbNiL'
      )
      .then(
        () => {
          this.contactForm.reset();
          this.response = 'success';
          this.loading = false;
          setTimeout(() => {
            this.response = undefined;
          },5000)
        },
        () => {
          this.response = 'error';
          this.loading = false;
          setTimeout(() => {
            this.response = undefined;
          },5000)
        }
      );
  }
}
