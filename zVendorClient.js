/**
 * Module Description
 * 
 * Version    Date            Author           Remarks
 * 1.00       16 Feb 2017     JMeiri
 *
 */



/**
 * The recordType (internal id) corresponds to the "Applied To" record in your script deployment. 
 * @appliedtorecord recordType
 *   
 * @returns {Boolean} True to continue save, false to abort save
 */
function clientSaveRecord(){
	/**
	 Payment Type is ACH, require for Bank Name, Bank Country, Bank Account Number, ABA Routing Number, Bank City, Bank State 
     Payment Type is Wire, require for Bank Name, Bank Country, Bank Account Number, ABA Routing Number, Bank City, Bank State, Swift Code
     Internal Values:
	   ACH	 	1
	   WIRE	 	2	 
	   
	   Bank Name,           Field ID: custentity_bankname
	   Bank Country,        Field ID: custentity_bankcountry
	   Bank Account Number, Field ID: custentity_bankaccountnumber
	   Bank City,           Field ID: custentity35
	   Bank State,          Field ID: custentity36
	   ABA Routing Number,  Field ID: custentity_abaroutingnumber
	   Swift Code,          Field ID: custentity_swiftcode
	   
	 **/
	var paymentType       = nlapiGetFieldValue('custentity37');
	// ach and wire
	var bankName          = nlapiGetFieldValue('custentity_bankname');
	var bankCountry       = nlapiGetFieldValue('custentity_bankcountry');
	var bankAccountNumber = nlapiGetFieldValue('custentity_bankaccountnumber');
	var bankCity          = nlapiGetFieldValue('custentity35');
	var bankState         = nlapiGetFieldValue('custentity36');
	var abaRoutingNumber  = nlapiGetFieldValue('custentity_abaroutingnumber');
	// wire only
	var swiftCode         = nlapiGetFieldValue('custentity_swiftcode');
	
	// ACH
	if (paymentType == 1){
		// nested for readability 
		if(bankName == '' || bankCountry == '' || bankAccountNumber == '' || bankCity =='' || bankState == '' || abaRoutingNumber == ''){
			alert('zError: ACH > Payment Type is *ACH*, required fields are Bank Name, Bank Country, Bank Account Number, ABA Routing Number, Bank City and Bank State.');
			return false;
		}		
	}
	// WIRE
	if (paymentType == 2){
		if(bankName == '' || bankCountry == '' || bankAccountNumber == '' || bankCity =='' || bankState == '' || abaRoutingNumber == '' || swiftCode == ''){
			alert('zError: Wire > Payment Type is *Wire*, required fields are Bank Name, Bank Country, Bank Account Number, ABA Routing Number, Bank City, Bank State and Swift Code.');
			return false;
		}
	}
    // all others... 
    return true;
}



/**
 * The recordType (internal id) corresponds to the "Applied To" record in your script deployment. 
 * @appliedtorecord recordType
 * 
 * @param {String} type Sublist internal id
 * @param {String} name Field internal id
 * @param {Number} linenum Optional line item number, starts from 1
 * @returns {Void}
 */
function clientFieldChanged(type, name, linenum){
/**	Payment Type is Check, there is NO NEED for other bank field to be fulfilled 
	Payment Type is ACH, require for Bank Name, Bank Country, Bank Account Number, ABA Routing Number, Bank City, Bank State 
	Payment Type is Wire, require for Bank Name, Bank Country, Bank Account Number, ABA Routing Number, Bank City, Bank State, Swift Code

    Internal Values:
	ACH	 	    1
	WIRE	 	2	 
	CHECK	 	3	 

**/
	if (name == 'custentity37'){
		var paymentType = nlapiGetFieldValue('custentity37');
		// ACH
		if (paymentType == 1){
			alert('zWarning: ACH > Payment Type is *ACH*, required fields are Bank Name, Bank Country, Bank Account Number, ABA Routing Number, Bank City and Bank State.');
		}
		// WIRE
		if (paymentType == 2){
			alert('zWarning: Wire > Payment Type is *Wire*, required fields are Bank Name, Bank Country, Bank Account Number, ABA Routing Number, Bank City, Bank State and Swift Code.');
		}
	}
 
}
