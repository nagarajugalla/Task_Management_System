import { Component, Inject, OnInit } from '@angular/core';
import { TaskService } from '../task.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef,MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css']
})
export class TaskFormComponent implements OnInit{
  addTaskForm:any= FormGroup;

  constructor(
    private taskService: TaskService,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<TaskFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, public dialog: MatDialog,
    ) {}

  ngOnInit(){
    this.addTaskForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      status: [false],
    });
  }
	getFormErrors(formcontrolName:any, keyName:any,keyText?:any) {
		if (this.addTaskForm.get(formcontrolName).touched || this.addTaskForm.get(formcontrolName).dirty ||
		  this.addTaskForm.get(formcontrolName).invalid) {
		  return this.addTaskForm.get(formcontrolName).hasError("required")
			? keyName + " is required"
			: this.addTaskForm.get(formcontrolName).hasError("pattern")
			  ? "Invalid " +keyName + keyText
			  : this.addTaskForm.get(formcontrolName).hasError("minlength")
				? "Enter minimum characters"
				: this.addTaskForm.get(formcontrolName).hasError("min")
				  ? "minimum length required"
				  : this.addTaskForm.get(formcontrolName).hasError("maxlength")
					? "Reached Maxmum Characters"
					: "";
		}
		else {
		  return "";
		}
	  }
    onCancel(){
      this.dialogRef.close();
    }
    submitForm(){
      this.dialogRef.close(this.addTaskForm.value);
    }
}
