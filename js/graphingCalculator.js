//This programme is a graphing calculator, it asks you what type of function you desire, then variables for that specific function
//It will print a graph with the function chosen on it

//Author: Mathis Jean[2024-06-26]

//Declare Variables
var m;
var b;
var a;
var h;
var k;
var B;
var r;

var attempts = 3;
let e = 0;

while (e < attempts)    
{
    var functionType = prompt("Select a function: Linear, Absolute, Exponential, Quadratic, Circle");

    switch (functionType) 
    {
        case "Linear":
            // Linear function
            functionType = "Linear";            
            m = Number(prompt("What is the slope of the function (m)")); // Slope of the line
            m = isNaN(m) ? 1 : m;          
           
            b = Number(prompt("What is the intercept of the function (b)")); // Intercept of the line
            b = isNaN(b) ? 0 : b;

            e = attempts;
            break;            

        case "Absolute":
            // Absolute function
            functionType = "Absolute";
            a = Number(prompt("What is the slope of the function (a)")); // Slope of the line
            a = isNaN(a) ? 1 : a;

            h = Number(prompt("What is the x-coordinate of the peak of the function(h)")); // x-coordinate of the peak
            h = isNaN(h) ? 0 : h; 
            
            k = Number(prompt("What is the y-coordinate of the peak of the function(k)"));  // y-coordinate of the peak
            k = isNaN(k) ? 0 : k; 

            e = attempts;
            break;

        case "Exponential":
            // Exponential function
            functionType = "Exponential";
            a = Number(prompt("What is the growth rate of the function (a)")); // Coefficient affecting the growth rate
            a = isNaN(a) ? 1 : a;

            B = Number(prompt("What is the exponent base of the function (B)")); // Base of the exponentiation
            B = isNaN(B) ? 2 : B;
            
            if(B == 0)
            {
                B = 2;;
                alert("The exponent base can't be 0, it has been set to 2 (B)");
            };

            h = Number(prompt("What is the horizontal translation of the function (h)")); // Horizontal shift (left or right)
            h = isNaN(h) ? 0 : h; 
            
            k = Number(prompt("What is the vertical translation of the function (k)")); // Vertical shift (up or down)
            k = isNaN(k) ? 0 : k; 

            e = attempts;
            break;

        case "Quadratic":
            // Quadratic function
            functionType = "Quadratic";
            a = Number(prompt("What is the growth rate of the function (a)")); // Coefficient affecting the growth rate
            a = isNaN(a) ? 1 : a;

            h = Number(prompt("What is the x-coordinate of the peak of the function(h)")); // x-coordinate of the peak
            h = isNaN(h) ? 0 : h; 
            
            k = Number(prompt("What is the y-coordinate of the peak of the function(k)"));  // y-coordinate of the peak
            k = isNaN(k) ? 0 : k; 

            e = attempts;
            break;

        case "Circle":
            // Circle function
            functionType = "Circle";
            h = Number(prompt("What is the x-coordinate of the center of the function(h)")); // x-coordinate of the center
            h = isNaN(h) ? 0 : h; 
            
            k = Number(prompt("What is the y-coordinate of the center of the function(k)"));  // y-coordinate of the center
            k = isNaN(k) ? 0 : k; 

            r = Number(prompt("What is the radius of the function (r)"));  // Radius of the circle
            r = isNaN(r) ? 10 : r;

            e = attempts;
            break;            

        default:
            functionType = "...";

            e++;
    };
};

var axisX = [];
var axisXCoords = [];

var graph = [];
var graphDimension = 18;

//Graph Data
var baseEquation;
var equation;
var domain;
var image;
var zeroTheFunction;

setupGraph();

//Setup the function
for (x = -graphDimension; x <= graphDimension; x++) 
    {
        var y;
        var Y;
        var x;
        var X;

        var y1;
        var Y1;
        var y2;
        var Y2;

        //Determine what function is used and set variables and values appropriatly
        functionUsed() ;    
        
        //Print the function path on the graph
        Y = graphDimension - y;
        X = graphDimension + x;

        Y1 = graphDimension - y1;
        Y2 = graphDimension - y2;

        if(functionType == "Circle")
        {
            if (Y1 >= 0 && Y1 <= graphDimension * 2 && X >= 0 && X <= graphDimension * 2) 
            {
                graph[Math.round(Y1)][Math.round(X)] = "@";
            };
                
            if (Y2 >= 0 && Y2 <= graphDimension * 2 && X >= 0 && X <= graphDimension * 2) 
            {
                graph[Math.round(Y2)][Math.round(X)] = "@";
            };

            graph[Math.round(graphDimension - k)][Math.round(h + graphDimension)] = "o";
        }

        else if(functionType != "...")
        {
            if (Y >= 0 && Y <= graphDimension * 2 && X >= 0 && X <= graphDimension * 2) 
            {
                graph[Math.round(Y)][Math.round(X)] = "@"; 
            }      ;        
        } ;
    };

//Print the graph to the console
printGraph();

//Print the data for the function
graphData();

function setupGraph()
{
    //Sets up graph spacing as well as x and y axis and y axis coordinates

    for(let q = 0; q <= (graphDimension * 2); q ++)
    {
        let graphX = [];

        axisXCoords[q] = graphDimension - q;

        if (q == graphDimension)
        {
            graph[q] = axisX;        
        }
    
        else if (q < graphDimension || q >= graphDimension)
        {
            graph[q] = graphX;
        };

        for (let p = 0; p < graphDimension; p++)
        {
            graphX[p] = " ";
            axisX[p] = "-";
        };
        
        graphX[graphDimension] = "|";
        axisX[graphDimension] = "+";
        
        for (let p = graphDimension + 1; p < graphDimension * 2 + 1; p++)
        {
            graphX[p] = " ";
            axisX[p] = "-";
        };
    };
};

function printGraph()
{
    //Prints the graph to the console after the function has been added, alignes the x coordinates and prints them to the console

    var axisXPrintingCoords = [];

    for(let q = 0; q <= (graphDimension * 2); q ++)
        {
            console.log(graph[q].join("   ") + " " + (graphDimension - q)) ;           

            if(String(axisXCoords[q] * -1).length == 1)
            {
                axisXPrintingCoords[q] = (String(axisXCoords[q] * -1) + "   ");
            }

            else if(String(axisXCoords[q] * -1).length == 2)
            {
                axisXPrintingCoords[q] = (String(axisXCoords[q] * -1) + "  ");
            }

            else if(String(axisXCoords[q] * -1).length == 3)
            {
                axisXPrintingCoords[q] = (String(axisXCoords[q] * -1) + " ");
            };
        };   
        
    console.log(axisXPrintingCoords.join(""));
};

function graphData()
{
    //Data for the function
    console.log("------------------------------------");
    console.log("Base equation: " + baseEquation);
    console.log("Equation: " + equation);
    console.log("Domain: " + domain);
    console.log("Image: " + image);
    console.log("Zero of the function: " + zeroTheFunction);

    if (functionType == "Absolute" || functionType == "Quadratic" || functionType == "Circle") //Only if the function has an axis of symmetry
        {
            console.log("Axis of symmetry equation: x = " + h);
        };

    if (functionType == "Exponential") //Only for exponential function
        {
            console.log("Asymptote Equations: y = " + k);
        };
};

function functionUsed()
{
    //Determines wich function is being used and sets values such as the equation and the zeros of the function for the specific function

    switch(functionType)
        {
            case "Linear":
                y = (m * x) + b;

                //Base equation
                baseEquation = "y = mx + b";

                //Equation
                equation = `y = ${m}x + ${b}`;          

                //Domain
                domain = "] -∞ , ∞ [";

                //Image
                image = "] -∞ , ∞ [";

                //Zero of the function
                try 
                {
                    if (m === 0 && b === 0) 
                    {
                        throw new Error("Division by zero error.");
                    }

                    else if (m === 0 && b !== 0)
                    {
                        zeroTheFunction = "None";
                    }    
                
                    else
                    {
                        zeroTheFunction = (-b / m).toFixed(2);
                    };

                }
                catch (Error) 
                {
                    zeroTheFunction = "∞";
                };

                break;




            case "Absolute":
                y = a * (Math.abs(x - h)) + k;

                //Base equation
                baseEquation = "y = a|x - h| + k";

                //Equation
                if (h / Math.abs(h) == -1)
                {
                    equation = `y = ${a}|x + ${h}| + ${k}`;
                }
                else
                {
                    let H = Math.abs(h);
                    equation = `y = ${a}|x - ${H}| + ${k}`;
                };

                //Domain
                domain = "] -∞ , ∞ [";

                //Image
                if ((a / Math.abs(a)) == 1)
                {
                    image = "[ " + k + " , ∞ [";
                }

                else
                {
                    image = "] -∞ , " + k + " ]";
                };

                //Zero of the function
                try 
                {
                    if (a === 0 && k === 0) 
                    {
                        throw new Error("Slope a is zero, division by zero error.");
                    }

                    else if (a === 0 && k !== 0)
                        {
                            zeroTheFunction = "None";
                        }

                    let zero1 = ((-k / a) + h).toFixed(2);
                    let zero2 = (-(-k / a) + h).toFixed(2);

                    if ((a * Math.abs(zero1 - h)) + k !== 0 && (a * Math.abs(zero2 - h)) + k !== 0)
                    {
                        zeroTheFunction = "None";
                    }

                    else if (zero1 != zero2)
                    {
                        zeroTheFunction = String(zero1) + ", " + String(zero2);
                    };

                    if (zero1 == zero2)
                    {
                        zeroTheFunction = String(zero1);
                    };
                }

                catch (error) 
                {
                    zeroTheFunction = "∞";
                };

                break;




            case "Exponential":
                y = a * (B ** (x - h)) + k;

                //Base equation
                baseEquation = "y = aBˣ⁻ʰ + k";

                //Equation
                var superScriptMap = 
                [
                    '0', '⁰', '1', '¹', '2', '²', '3', '³', '4', '⁴', '5', '⁵', '6', '⁶', '7', '⁷', '8', '⁸', '9', '⁹',
                ];

                var arrayH = [];
                var power = "ˣ⁻";

                for (let q = 0; q < String(h).length; q++)
                {
                    arrayH[q] = String(h).slice(q, q + 1);
                    
                    let indexH = superScriptMap.indexOf(String(arrayH[q])) + 1;

                    power += "h";
                    power = power.replace(/h/g, superScriptMap[indexH]);
                };    

                equation = `y = ${a}(${B})${power} + ${k}` ;      

                //Domain
                domain = "] -∞ , ∞ [";

                //Image
                image = "] -∞ , ∞ [";

                //Zero of the function
                try 
                {
                    if (a === 0 && k === 0) 
                    {
                        throw new Error("Slope m is zero, division by zero error.");
                    }

                    else if (a === 0 && k !== 0)
                    {
                        zeroTheFunction = "None";
                    };

                    if (isNaN((h + Math.log(0 - k / a) / Math.log(B)).toFixed(2)))
                    {
                        zeroTheFunction = "None";
                    }

                    else if (String((h + Math.log(0 - k / a) / Math.log(B)).toFixed(2)) == "-Infinity" || String((h + Math.log(0 - k / a) / Math.log(B)).toFixed(2)) == "Infinity")
                    {
                        zeroTheFunction = "None";
                    }

                    else
                    {
                        zeroTheFunction = String((h + Math.log(0 - k / a) / Math.log(B)).toFixed(2));
                    } ;                   
                }

                catch (error) 
                {
                    zeroTheFunction = "∞";
                };

                break;




            case "Quadratic":
                y = a * ((x - h) ** 2) + k;

                //Base equation
                baseEquation = "y = a(x - h)² + k";

                //Equation
                if (h / Math.abs(h) == -1)
                {
                    equation = `y = ${a}(x - ${h})² + ${k}`;
                }
                else
                {
                    let H = Math.abs(h);
                    equation = `y = ${a}(x + ${H})² + ${k}`;
                };

                //Domain
                domain = "] -∞ , ∞ [";

                //Image
                if ((a / Math.abs(a)) == 1)
                {
                    image = "[ " + k + " , ∞ [";
                }
    
                else
                {
                    image = "] -∞ , " + k + " ]";
                };

                //Zero of the function
                try 
                {
                    let zero1 = -Math.sqrt(-k / a) + h;
                    let zero2 = Math.sqrt(-k / a) + h;

                    if (a === 0 && k === 0) 
                    {
                        throw new Error("Slope m is zero, division by zero error.");
                    }

                    else if (a === 0 && k !== 0)
                    {
                        zeroTheFunction = "None";
                    };

                    if (isNaN(-Math.sqrt(-k / a) + h) && isNaN(Math.sqrt(-k / a) + h))
                    {
                        zeroTheFunction = "None";
                    }

                    else if (zero1 != zero2)
                    {
                        zeroTheFunction = String(zero1.toFixed(2)) + ", " + String(zero2.toFixed(2));
                    };

                    if (zero1 == zero2)
                    {
                        zeroTheFunction = String(zero1.toFixed(2));
                    };

                }

                catch (error) 
                {
                    zeroTheFunction = "∞";
                };

                break;




            case "Circle":
                y1 = k + Math.sqrt(r*r - Math.pow((x - h), 2));
                y2 = k - Math.sqrt(r*r - Math.pow((x - h), 2));

                //Base equation
                baseEquation = "(x - h)² + (y - k)² = r²";

                //Equation
                if (h / Math.abs(h) == -1)
                {
                    let H = Math.abs(h);

                    if (k / Math.abs(k) == -1)
                    {
                        let K = Math.abs(k);
                        
                        equation = `(x + ${H})² + (y + ${K})² = ${r}²`;
                    }

                    else
                    {
                        equation = `(x + ${H})² + (y - ${k})² = ${r}²`;
                    };
                }

                else
                {
                    if (k / Math.abs(k) == -1)
                    {
                        let K = Math.abs(k);
                        
                        equation = `(x - ${h})² + (y + ${K})² = ${r}²`;
                    }

                    else
                    {
                        equation = `(x - ${h})² + (y - ${k})² = ${r}²`;
                    };
                };                  

                //Domain
                domain = "[" + String(h - r) + " , " + String(h + r) + "]";

                //Image
                image = "[" + String(k - r) + " , " + String(k + r) + "]";

                //Zero of the function
                let zero1 = h + Math.sqrt(r*r - Math.pow((- k), 2));
                let zero2 = h - Math.sqrt(r*r - Math.pow((- k), 2));

                if (zero1 != zero2)
                {
                    zeroTheFunction = String(zero1.toFixed(2)) + ", " + String(zero2.toFixed(2));
                }

                else if (zero1 == zero2)
                {
                    zeroTheFunction = String(zero1.toFixed(2));
                };

                break;




            default:
                //Arrays that determine the position of the king
                let arrayX = 
                [
                    -2, 2,-2, 2,-2,-1, 0, 2, 1, 2, 2,-3, 3,-3, 3,-4, 4,-4, 4,-5, 5,-3, 3,-2, 2,-1, 1, 0,-4, 4, 0, 0,-1, 1, 1,-1,-2,-1, 0, 1, 2,-2, 2,-2, 3,-3, 3,-3, 2,-2, 0, 0,-1, 1, 2,-2
                ]; 

                let arrayY = 
                [ 
                    5, 5, 6, 6, 6, 6, 7, 6, 7, 7, 7, 4, 4, 3, 3, 2, 2, 0, 0, 1, 1,-2,-2,-3,-3,-4,-4,-5,-1,-1, 3, 2, 2, 2, 5, 5,10, 9, 9, 9,10,11,11,12,12,13,13,14,13,14,14,13,13,12,14,15
                ];

                let arraymX = 
                [
                    -2, 2,-3, 3, 3,-3, 3,-3, 3,-3, 2,-2, 1,-1, 0,-1, 1,-2, 2
                ];

                let arraymY = 
                [
                     2, 2, 2, 2, 1, 1, 0, 0,-1,-1,-2,-2,-3,-3,-3, 4, 4, 4, 4
                ];

                //Print the king to the graph
                for(let q = 0; q < arrayY.length; q++)
                {
                    X = graphDimension + arrayX[q];
                    Y = graphDimension - arrayY[q];                  

                    graph[Math.round(Y)][Math.round(X)] = "█";
                };
                    
                for(let q = 0; q < arraymY.length; q++)
                {
                    mX = graphDimension + arraymX[q];
                    mY = graphDimension - arraymY[q];                  
    
                    graph[Math.round(mY)][Math.round(mX)] = "#";
                };
            
                //Base equation
                baseEquation = "HiHiHaHa";

                //Equation
                equation = "HiHiHaHa";
                
                //Domain
                domain = "HiHiHaHa";

                //Image
                image = "HiHiHaHa";

                //Zero of the function
                zeroTheFunction = "HiHiHaHa";
                
                break;
        };
};