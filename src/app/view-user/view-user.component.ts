import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-view-user',
  templateUrl: './view-user.component.html',
  styleUrls: ['./view-user.component.css']
})
export class ViewUserComponent implements OnInit {
  savedPermissions: any = null;


  constructor() { }

  @Output() subItemSelected = new EventEmitter<string>();
  selectedSubItem: string;

  navItems = [
    {
      name: 'Loans & Car Finance',
      expanded: false,
      subItems: ['Personal Loans', 'Car Loans']
    },
    {
      name: 'Credit Cards',
      expanded: false,
      subItems: ['Classic Card', 'Platinum Card']
    },
    {
      name: 'Overdrafts',
      expanded: false,
      subItems: ['Planned Overdrafts', 'Unplanned Overdrafts']
    },
    {
      name: 'Mortgages',
      expanded: false,
      subItems: ['Fixed Rate', 'Tracker Rate']
    },
    {
      name: 'Home Insurance',
      expanded: false,
      subItems: ['Buildings Insurance', 'Contents Insurance']
    },
    {
      name: 'Insurance',
      expanded: false,
      subItems: ['Car Insurance', 'Life Insurance']
    },
    {
      name: 'Trusted Access',
      expanded: false,
      subItems: ['Add Trusted User', 'View Trusted Accounts']
    },
    {
      name: 'Bank Accounts',
      expanded: false,
      subItems: ['Current Accounts', 'Savings Accounts']
    },
    {
      name: 'Upgrade Bank Account',
      expanded: false,
      subItems: ['Upgrade to Platinum', 'Upgrade to Gold']
    },
    {
      name: 'Savings & Investments',
      expanded: false,
      subItems: ['ISAs', 'Bonds']
    }
  ];


  currentStep = 1;
  userData: any = {};
  showDetails = false;
  termsAccepted = false;
  stage1 = false;

  accessOptions = [
    { title: 'Permanent Access', details: 'Details about permanent access.' },
    { title: 'Temporary Access', details: 'Details about temporary access.' },
    { title: 'Emergency Access', details: 'Details about emergency access.' }
  ];

  permissionOptions = [
    { id: 'viewOnly', label: 'View Only', disabled: false },
    { id: 'creditMortgage', label: 'Credit and Mortgage Management', disabled: false },
    { id: 'bankingActivity', label: 'Banking Activity Management', disabled: false },
    { id: 'payBills', label: 'Pay Bills', disabled: false },
    { id: 'transactionAccess', label: 'Transaction Access', disabled: false },
  ];


  // toggleSection(event: Event, item) {
  //   event.preventDefault();
  //   item.expanded = !item.expanded;
  // }

  // preventDefault(event: Event) {
  //   event.preventDefault();
  // }

  // selectSubItem(event: Event, subItem: string) {
  //   event.preventDefault();
  //   this.subItemSelected.emit(subItem);
  // }
  errorMessage: string;
  sav: any = {};
  isLogin: boolean= false;
titleT: string;
  onSubmit(form: NgForm) {
    const { name } = form.value;
    const { code } = form.value;
    const { email } = form.value;

    if (this.isValidUsername(name) && this.isValidCode(code) && this.isValidEmail(email)) {
      // Proceed with form submission

      form.resetForm();
      this.errorMessage = '';
      this.stage1=true;
      this.titleT="Trust Access for S Ghosh.";
      this.isLogin= true;
      localStorage.setItem('islogin', JSON.stringify(this.isLogin));

      const saved = localStorage.getItem('permissions');
      console.log(saved);
      if (saved) {
        this.savedPermissions = JSON.parse(saved);
      }
    } else {
      // Set error message
      this.errorMessage = 'Invalid Details. Please try again.';
    }
 
   
  }

  isValidUsername(name: string): boolean {
    // Add your username validation logic here
    // Example: Username must be at least 3 characters long
    return (name.length >= 3);


  }
  isValidCode(email: string): boolean {
    // Add your username validation logic here
    // Example: Username must be at least 3 characters long
    return (email.length >= 3);


  }
  isValidEmail(code: string): boolean {
    // Add your username validation logic here
    // Example: Username must be at least 3 characters long
    return (code.length >= 3);

  }
  toggleSection(event: Event, item) {
    event.preventDefault();
    item.expanded = !item.expanded;
    // this.showDetails=true
  }

  selectSubItem(event: Event, subItem: string) {
    event.preventDefault();
    this.selectedSubItem = subItem;
  }
  ngOnInit(): void {
    // localStorage.clear();
    this.userData.transactionAccess = false;
    this.userData = JSON.parse(localStorage.getItem('userData')) || {};
    this.titleT="S Ghosh want to add you as trust user. Would you like to be the trust user?";
    const saved = localStorage.getItem('islogin');
    console.log("test   "+localStorage.getItem('islogin'));
    if (saved) {
      this.stage1=true;
      this.titleT="Trust Access for S Ghosh.";
      this.isLogin= true;
      const saved1 = localStorage.getItem('permissions');
      console.log(saved1);
      if (saved1) {
        this.savedPermissions = JSON.parse(saved1);
      }
    }
   }
  nextStep(step: number) {
    this.currentStep = step;
    if (step === 4 && this.userData.transactionAccess) {
      this.permissionOptions[5].disabled = false;
    } else {
      this.permissionOptions[5].disabled = true;
    }
  }

  submitForm() {
    if (this.termsAccepted) {
      localStorage.setItem('userData', JSON.stringify(this.userData));
      this.nextStep(6);
    }
  }

  toggleDetails() {
    this.showDetails = !this.showDetails;
  }
  toggleOption(option: string) {
    this.userData[option] = !this.userData[option];
  }
  isSelected(option: string): boolean {
    return this.userData[option];
  }
  deletes()
  {
    localStorage.clear();
    this.currentStep=1;
  }
}
