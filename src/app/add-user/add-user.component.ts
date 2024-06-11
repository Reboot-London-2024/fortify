import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})

export class AddUserComponent implements OnInit {

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

  accessOptions = [
    { title: 'Admin Access', details: 'User will get permanent access for this account.' },
    { title: 'Limited Access', details: 'User will get temporary access for some features.' },
    { title: 'Emergency Access', details: 'User will get Temporary access for certain time.' }
  ];
  submittedPermissions: any = {};

  permissions = {
    balanceView: false,
    transactionView: false,
    paySetup: false,
    payDomestic: false,
    payAll: false,
    payLimit: '',
    payApproval: false,
    creditView: false,
    creditManage: false,
    creditMaxLimit: '',
    creditApproval: false,
    spendingView: false,
    investmentsView: false,
    investmentsManage: false
  };
  sections = {
    balance: false,
    transaction: false,
    pay: false,
    credit: false,
    spending: false,
    investments: false
  };
  toggleSection1(section: string) {
    this.sections[section] = !this.sections[section];
  }


  // permissionOptions = [
  //   { id: 'viewOnly', label: 'Read Only', disabled: false },
  //   { id: 'creditMortgage', label: 'Bill and Mortgage Management', disabled: false },
  //   { id: 'bankingActivity', label: 'Banking Activity Management', disabled: false },
  //   { id: 'payBills', label: 'Pay Bills', disabled: false },
  //   { id: 'transactionAccess', label: 'Transaction Access', disabled: false },
  // ];


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
  toggleSection(event: Event, item) {
    event.preventDefault();
    item.expanded = !item.expanded;
  }

  selectSubItem(event: Event, subItem: string) {
    event.preventDefault();
    this.selectedSubItem = subItem;
  }
  ngOnInit(): void {

    this.userData.transactionAccess = false;
    this.userData = JSON.parse(localStorage.getItem('userData')) || {};
   }
  nextStep(step: number) {
    this.currentStep = step;
    // if (step === 4 && this.userData.transactionAccess) {
    //   this.permissionOptions[5].disabled = false;
    // } else {
    //   this.permissionOptions[5].disabled = true;
    // }
  }

  submitForm() {
    if (this.termsAccepted) {
      this.submittedPermissions = { ...this.permissions };
      localStorage.setItem('userData', JSON.stringify(this.userData));
      localStorage.setItem('permissions', JSON.stringify(this.submittedPermissions));

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
