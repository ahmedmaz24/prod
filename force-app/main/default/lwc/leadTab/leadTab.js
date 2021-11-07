import { LightningElement, wire, track, api} from 'lwc';
import getAuddit from '@salesforce/apex/LeadFetch.getAudits'

const COLUMNS = [   
    {label : 'ID', fieldName:'idi__c'},
    {label : 'Field nname', fieldName:'name_of_field__c'},
    {label : 'Object ID', fieldName:'name_of_object__c'},
    {label : 'New Value', fieldName:'new_value__c'},
    {label : 'Old Value', fieldName:'old_value__c'},
    {label : 'Type Of Change', fieldName:'type_of_change__c',cellAttributes:{
    class:{fieldName:'ChangeColor'}
    }},
    {label : 'Type Of Object', fieldName:'type_of_object__c'},
    {label : 'Date', fieldName:'date__c' },
    {label : 'User', fieldName:'user_audit__c'},]
export default class LeadTab extends LightningElement {
    value='Lead';
    @api content;
contactList = [];

tableData
columns = COLUMNS 
@wire(getAuddit, {params :'$value'})
auditHandler({data,error}){
if(data){

//if the type of change is delete , paint it in red color 
this.tableData = data.map(item=>{
    let ChangeColor ;
    if(item.type_of_change__c == 'Delete'){
            ChangeColor="slds-text-color_error";
    }else if(item.type_of_change__c =='Create'){
            ChangeColor="slds-text-color_success";

        }else{
        ChangeColor="slds-text-color_default";
    }


    

    return{...item,"ChangeColor":ChangeColor}
    
}) 

}}}