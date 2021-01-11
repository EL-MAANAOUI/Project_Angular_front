import { Component, OnInit } from '@angular/core';
import { RepasService } from 'src/app/services/repas.service';
import { HttpClient } from '@angular/common/http';
import { AuthService } from 'src/app/auth/services/auth.service';
import { TokenService } from 'src/app/auth/services/token.service';
@Component({
  selector: 'app-index',
  templateUrl: './result.html',
  styleUrls: ['./result.css']
})
export class ResultComponent implements OnInit {
  mesCommande:any[]=[];
  prix_total;
  tables:[];
  tableSelected;
  logged:boolean;
  constructor( private repasService:RepasService ,private http: HttpClient, private auth_service:AuthService, private token_service:TokenService,
    
    ) { 
    this.mesCommande=this.repasService.commande;
    this.prix_total=this.repasService.prix_total;
    console.log(this.mesCommande);
    this.repasService.gettables().subscribe(
      (response:any)=>{
       this.tables=response;
       console.log(this.tables);
      },
      (error)=>{ },
    );

    this.logged = this.token_service.loggedIn();

     // listen for login or logout events
     this.auth_service.authStatut.subscribe(
      (data)=>{ 
        this.logged = data; 
      }
    );


  }

  ngOnInit() {
    
  }



  btnPlus(Commande){
    var y = +Commande.qte;
    Commande.qte=y +1;
    console.log(Commande);

  }
  btnminus(Commande){
    if(Commande.qte > 1){
      Commande.qte=Commande.qte -1;
    }
    console.log(Commande);
  }

  calculerPrixttc(){
    this.prix_total=0;
    this.mesCommande.forEach(element => {
      this.prix_total+=element.qte * element.price_unit;
    });
    return this.prix_total;
  }
  getPrixtotal(){
    this.prix_total=this.repasService.prix_total;
    return this.prix_total;
  }

  checkout(){

    if(this.logged){
      var commandes = JSON.stringify([{ "repas": this.mesCommande, "prix_ttc": this.prix_total, "table_id": this.tableSelected,"client_id":1 }]);
      console.log(commandes);
      this.http.post("/api/commande_add", commandes).subscribe(
        (response:any) => {
          this.repasService.gotoresult();
        },
        (error) => {
            // this.toastr.error(this.translate.instant('TOASTER.ERROR.ERROR_BOOKING'));
            // this.loader.hide();
        });
    }else{
      this.auth_service.openModal();  
    }
    
  }


}
