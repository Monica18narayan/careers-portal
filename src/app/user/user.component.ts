import { Component,NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { FormBuilder, FormGroup, Validators,FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',

 
  styleUrls: ['./user.component.css']
})
export class UserComponent {
  title="Sequelize";
  userForm: FormGroup;
  users: any[] = [];
  user: any = {};
  filterText: string = '';
  message: string = '';
  allUsers: any[] = [];
userDetails:any=[];
userDetails1:any[]=[];
isDuplicateEmail: boolean = false;

  constructor(private formBuilder: FormBuilder, private http: HttpClient) {
    this.userForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      age: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]]
    });
  }

 


updateUser(newUser: any) {
  this.http.put(`http://localhost:3001/api/update-user/${newUser.email}`, newUser)
    .subscribe(
      (response: any) => {
        alert('User updated successfully.');
        this.displayUsers(); 
        this.userForm.reset(); 
      },
      (error) => {
        console.error('Error updating user', error);
       
      }
    );
}


addUser(newUser: any) {
  this.http.post('http://localhost:3001/api/add-user', newUser).subscribe(
    (response: any) => {
      alert('User added successfully.');
      this.displayUsers();
      this.userForm.reset();
    },
    (error) => {
      console.error('Error adding user', error);
    }
  );
}

  
  

  displayUsers() {
    this.http.get<any[]>('http://localhost:3001/api/get-users').subscribe(
      (data) => {
        this.allUsers = data;
        this.users = this.allUsers.slice(-1); 
  
        // Set a timer to clear the displayed users after 30 seconds
        // setTimeout(() => {
        //   this.clearDisplayedUsers();
        // }, 30000);
      },
      (error) => {
        console.error('error fetching users', error);
      }
    );
  }
  
  clearDisplayedUsers() {
    this.users = [];
  }
  

  searchByEmail() {
    const email = this.filterText;
  
    if (email) {
      this.http.get<any>(`http://localhost:3001/api/get-user-by-email/${email}`).subscribe(
        (userDetails) => {
          if (userDetails) {
            this.userDetails = userDetails; 
            this.userDetails1=userDetails;
            this.userForm.patchValue({
              firstName: userDetails.firstName,
              lastName: userDetails.lastName,
              age: userDetails.age,
              email: userDetails.email,
             
            });
            this.message = ''; 
          } else {
            this.message = 'User not found';
            this.userForm.reset();
          }
        },
        (error) => {
          console.error('Error fetching user by email:', error);
          this.message = 'Internal Server Error';
          this.userForm.reset();
        }
      );
    } else {
      this.message = 'Please provide an email to search';
      this.userForm.reset();
    }
  }

  onSubmit() {
    debugger
    if (this.userForm.valid) {
      const newUser = this.userForm.value;
      
      if (this.userDetails!='') {
        
        this.updateUser(newUser); 
      } else {
        this.addUser(newUser); 
      }
    } else {
      alert('Please fill in all required fields correctly.');
    }
  }

  onDelete() {
    if (confirm('Are you sure you want to delete this user?')) {
      const emailToDelete = this.userDetails.email; 
  
      this.http.delete(`http://localhost:3001/api/delete-user-by-email/${emailToDelete}`).subscribe(
        (response) => {
          console.log('Delete response:', response); 
          this.message = 'User deleted successfully';
          this.allUsers = this.allUsers.filter(user => user.email !== emailToDelete); 
          this.users = this.users.filter(user => user.email !== emailToDelete); 
          this.userForm.reset();
          this.userDetails = null;
        },
        (error) => {
          console.error('Error deleting user:', error);
          this.message = 'Failed to delete user';
        }
      );
    }
  }
  
  

  
  
  



  
  // toggleEditMode(user: any) {
  //   user.editMode = !user.editMode; // Toggle edit mode
  // }

  // saveChanges(user: any) {
  //   // Implement the HTTP PUT request to update the user
  //   this.updateUser(user).subscribe(
  //     (response) => {
  //       user.editMode = false; // Disable edit mode after saving changes
  //       this.displayUsers(); // Refresh the user list after changes
  //     },
  //     (error) => {
  //       console.error('Error updating user:', error);
  //       // Handle the error appropriately
  //     }
  //   );
  // }

  // updateUser(user: any) {
  //   const { firstName, lastName, age, email } = user;
  //   const userId = user.id; // Replace 'id' with your actual user ID property
  
  //   return this.http.put(`http://localhost:3001/api/edit-user/${userId}`, { firstName, lastName, age, email });
  // }

  // displayUsers() {
  //   // Fetch and display the updated user list after editing
  //   this.http.get<any[]>('http://localhost:3001/api/get-users').subscribe(
  //     (data) => {
  //       this.users = data;
  //     },
  //     (error) => {
  //       console.error('error fetching users', error);
  //     }
  //   );
  // }

  ngOnInit() {
    this.displayUsers();
  }
}
  
  
 
