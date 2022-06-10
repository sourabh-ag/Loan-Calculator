const amount = document.getElementById('amount');
const interest = document.getElementById('interest');
const years = document.getElementById('years');
const monthlyPayment = document.getElementById('monthly-payment');
const totalPayment = document.getElementById('total-payment');
const totalInterest = document.getElementById('total-interest');


document.getElementById('loan-form').addEventListener('submit', function(e)
{
    //hide results
    document.getElementById('results').style.display = 'none';

    //Show loader
    document.getElementById('loading').style.display = 'block';
    
    setTimeout(calculateResults, 2000);

    e.preventDefault(); 
});

// setTimeout(calculateResults, 2000);

//Calculate Results
function calculateResults()
{
    const principal = parseFloat(amount.value);
    const calculatedInterest = parseFloat(interest.value)/(100*12);
    const calculatedYears = parseFloat(years.value)*12;
    const x = Math.pow(1+calculatedInterest, calculatedYears);

    //Monthly Payment
    const EMI = (principal*calculatedInterest*x)/(x-1);

    //Check whether EMI is a finite number
    if(isFinite(EMI))
    {
        monthlyPayment.value = EMI.toFixed(2); //.toFixed(2) determines the decimal places
        totalPayment.value =  (EMI*calculatedYears).toFixed(2);
        totalInterest.value = ((EMI*calculatedYears) - principal).toFixed(2);

        //Show Results
        document.getElementById('results').style.display = 'block';

        //Hide loading image
        document.getElementById('loading').style.display = 'none';
    }
    else
    {
        //If some value is not logged properly
        showError('Please check your numbers'); //Function created

        //Show Results
        document.getElementById('results').style.display = 'none';

        //Hide loading image
        document.getElementById('loading').style.display = 'none';
    }
}

function showError(error)
{
    const errorDiv = document.createElement('div');

    //Get elements
    const card = document.querySelector('.card');
    const heading = document.querySelector('.heading');

    //Add class
    errorDiv.className = 'alert alert-danger';

    //Create text node
    errorDiv.appendChild(document.createTextNode(error));

    //Insert error above heading
    card.insertBefore(errorDiv, heading); //parentelement.insertBefore(element to  be inserted, child element of which before the other element will be inserted)

    //Clear error after 3sec
    setTimeout(clearError, 3000);

    function clearError()
    {
        document.querySelector('.alert').remove();
    }
}