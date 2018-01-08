import { Component } from '@angular/core';
import { OnInit } from "@angular/core/src/metadata/lifecycle_hooks";

@Component({
    selector: "allsamples",
    templateUrl:"./allsamples.html"
})
export class AllSampleComponent implements OnInit{
    sample:number;
    ngOnInit(): void {
    }

    
}