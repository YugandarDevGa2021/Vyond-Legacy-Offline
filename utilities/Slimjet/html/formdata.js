function GetFormData(form,use_escape)
//Function: returns the data of the specified form in url parameter format.
//form: the form element.
//return value: return the format in url parameter format, "field1=value1&field2=value2...".
{
	use_escape=use_escape || false;
	var esc_func=use_escape?escape:encodeURIComponent;
	var sFormData="";
	var bEmpty=true;
	for(var i=0;i<form.elements.length;i++)
	{
		var elem=form.elements[i];
		//Save hidden fields as well. Otherwise, travelers.com login forms can't be auto-filled
		//if (elem.style.display=="none") continue;
		var t=elem.type;
		var en=elem.name;
		if (en=="" || en==null) en=elem.id;
		if (en==null || en=="") continue;
		var tn=elem.tagName.toLowerCase();
		var s="";
		if (elem.disabled==false)
		{
			if (tn=="input")
			{
				if ((t=="text" || t=="email")) 
				{
					s=en+"="+esc_func(elem.value);
				}
				else if (t=="checkbox")
				{
					s=en+"="+(elem.checked?1:0);
				}
				else if (t=="radio") 
				{
					if (elem.checked) s=en+"="+esc_func(elem.value);
				}
				else if (t=="password" && elem.readOnly==false) 
				{
					s=en+"=$sbpswd:"+esc_func(elem.value);
				}
			}
			else if (tn=="textarea" && elem.readOnly==false)
			{
				s=en+"="+esc_func(elem.value);
			}
			else if (tn=="select")
			{
				s="";
				for (var j=0;j<elem.options.length;j++)
				{
					var opt=elem.options[j];
					if (opt.selected) 
					{
						if (s!="") s=s+"&";
						if (opt.value!="") s=s+en+"="+esc_func(opt.value);
						else s=en+"="+esc_func(opt.text);
					}
				}
			}
		}
		if (s=="") continue;
		if (sFormData=="") sFormData=s;
		else sFormData=sFormData+"&"+s;
	}
	return sFormData;
}

function FillFormData(sFormData)
{
	FillForm(0,sFormData,"");
}

function FillForm(nFormIndex,sFormData,sFlag)
//return the number of fields successfully filled including those ignored due to empty-only flag.
{
	var namevalues=sFormData.split("&");
	var nFilled=0;
	for (var i=0;i<namevalues.length;i++)
	{
		var nv=namevalues[i].split("=");
		var name=nv[0];
		var value=decodeURIComponent(nv[1]);
		if (FillFormField(document,nFormIndex,name,value,sFlag)) nFilled++;
	}
	return nFilled;
}

function FillFormField(vDoc,vFormIndex,vName,vValue,sFlag)
//sFlag - supported flags, empty_only: fill text input or text area only if there are no existing text.
//return 0 if the field can't be filled.
//return 1 if the field can be filled but ignored due to the empty-only flag
//return 2 if the form field is filled successfully.
{
	var bPassword=false;
	if (vValue.substr(0,8)=="$sbpswd:") 
	{
		vValue=vValue.substr(8);
		bPassword=true;
	}
	sFlag=","+sFlag+",";	//add separators to beginning and end for easier flag recognition.
	var bEmptyOnly=(sFlag.indexOf(",empty_only,")!=-1);
	var form=vDoc.forms[vFormIndex];
	if (form==null) return 0;
	var elem=form.elements[vName];
	var tn;
	if (elem==null) return 0;
	//elem might be a collection objects, for example, a group of radio buttons. It might also happen since elements collection matches both id and name. we will discard the ID match and only take the name match in this case.
	if (elem.tagName==null && elem.length!=null)
	{
		var col=elem;
		for (var i=0;i<col.length;i++)
		{
			elem=col[i];
			var t=elem.type.toLowerCase();
			//make sure element name matches vName (discard id matches), and if it's radio button, the value matches vValue too. 
			if (elem.name==vName && (t!="radio" || elem.value==vValue)) break;
		}
	}
	
	if (elem.name!=vName && elem.id!=vName) return 0;
	try
	{
		if (tn.readOnly) return 0;
	}
	catch(e) {};
	try
	{
		if (tn.disabled) return 0;
	}
	catch(e) {};
	tn=elem.tagName.toLowerCase();
	if (tn=="input")
	{
		var t=elem.type;
		if (t=="text" || t=="password" || t=="email") 
		{
			//we don't fill passwords into text fields for security purpose.
			if (t!="password" && bPassword) return 0;
			if (bEmptyOnly && elem.value!="") return 1;
			elem.value=vValue;
		}
		else if (t=="radio") elem.checked=(vValue==elem.value); 
		else if (t=="checkbox") elem.checked=(vValue=="1");
	}
	else if (tn=="select")
	{
		for (var i=0; i< elem.options.length;i++)
		{
			if (elem.options[i].value!="") elem.options[i].selected=(elem.options[i].value==vValue);
			else elem.options[i].selected=(elem.options[i].text==vValue);
		}
	}
	else if (tn=="textarea") 
	{
		if (bEmptyOnly && elem.value!="") return 1;
		elem.value=vValue;
	}
	else return 0;
	return 2;
}
