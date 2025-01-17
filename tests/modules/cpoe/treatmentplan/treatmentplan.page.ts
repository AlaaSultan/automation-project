import { Page,Locator } from "@playwright/test";
export class treatmentplan{

    readonly page:Page;
    readonly orders:Locator;
    readonly TreatmentPlan:Locator;
    readonly assignto:Locator;
    readonly filterbtn:Locator;
    readonly selectedtreatmentplan:Locator;
    readonly startbtn:Locator;
    readonly savebtn:Locator;
    readonly viewpatienttreatmentplan :Locator;
    readonly startedfilter:Locator;
    readonly startedtreatmentplan:Locator;
    readonly stopbtn:Locator;
    readonly reasonsklp:Locator;
    readonly reason:Locator;
    readonly stopaction:Locator;


    constructor(page:Page){
        this.page=page;
        this.orders=page.getByText('Orders', { exact: true });
        this.TreatmentPlan=page.getByText('TreatmentPlan');
        this.assignto=page.locator('#AssignedToID');
        this.filterbtn=page.locator('[class="bo-cta-bg bo-white-txt pl-4 pr-4 mx-2 float-right"]');
        this.selectedtreatmentplan=page.locator('#treatmentPlanID').getByText('Dementia in Alzheimer s disease with early onset (G30.0+)')
        this .startbtn=page.locator('[class="no-bg cursor-pointer k-grid-startTreatmentPlan start-plan plan-btns no-border no-shadow btn-txt-green-dark-hover fa-1x d-inline-block"]');;
        this .savebtn=page.locator('[class="btn pull-right btn-primary"]');
        this. viewpatienttreatmentplan =page.locator('[class="k-link pr-4 pl-4 pl-4 k-item k-state-default k-last"]');
        this. startedfilter=page.locator(('[class="bo-cta-bg bo-white-txt pl-4 pr-4 mx-2 float-right"]'));
        this. startedtreatmentplan=page.locator(('[class="trimspan startdatetime dashed k-state-border-down"]'));
        this. stopbtn=page.locator(('[class="no-bg k-grid-stopTreatmentPlan d-inline-block stop-plan plan-btns no-border no-shadow btn-txt-green-dark-hover fa-1x cursor-pointer"]'));
        this. reasonsklp= page.locator('#stop-plan-id___BV_modal_body_').getByLabel('select');
        this. reason=page.getByRole('option', { name: 'Reason 2' });
        this. stopaction=page.getByRole('button', { name: 'Stop' });

    }
    async  Navigate_To_cpoe(url:string) {
        await this.page.goto(url);
        
    }
    async starttreatmentplan (){
        await this.orders.click();
        await this.TreatmentPlan.click();
        await this.assignto.click();
        await this.filterbtn.click();
        await this.selectedtreatmentplan.click();
        await this.startbtn.click();
        await this.savebtn.isVisible();
        this.page.on('dialog', async dialog => {
            await expect  (dialog.message()).toContain('Treatmen plan has been stopped successfully!');
            
            await dialog.dismiss();
          });
        await this.savebtn.click();
   
    }
    async stoptreatmentplan(){
        await this.orders.click();
        await this.TreatmentPlan.click();
        await this.viewpatienttreatmentplan.click();
        await this.startedfilter.click();

        await this.stopbtn.click();
        await this.reasonsklp.click();
        await this.reason.click();
        await this.stopaction.click();

    }

};
