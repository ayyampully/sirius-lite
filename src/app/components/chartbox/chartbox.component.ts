import { Component, OnInit, Input } from '@angular/core';
import {YELLOW_THEME, BLUE_THEME} from '../../constants/color';
//import {ROUTER_DIRECTIVES} from '@angular/router'
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  //moduleId: module.id,
  selector: 'app-chartbox',
  templateUrl: './chartbox.component.html',
  styleUrls: ['./chartbox.component.css'],
  //directives: [ROUTER_DIRECTIVES]
})

export class ChartboxComponent implements OnInit {
  @Input() projectData;
  @Input() projectid;
  svgpath: Array<SVGPath>;
  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit() {
	var pdata = this.projectData;
	this.isFullCircle = '';
	var theme = pdata.label==="Features" ? BLUE_THEME : YELLOW_THEME;
	if(pdata.total){
    	this.drawPie(pdata, theme);
		
	}
  }
  gotoDetails() {
    let projid = this.projectid ? this.projectid : 0;
    this.router.navigate(['/projects/'+projid+'/list'], { relativeTo: this.route });
  }

  isFullCircle: string;
  
  drawPie(pdata, theme){
	var cx = 100,
		cy = 100,
		r = 92,
		px = 192,
		py = 100,
		path = '',
		colors = theme,// from kuler
		graphData = pdata.data;

	var pathArray = [],
		percArray = [];

	for(let i=0; i<graphData.length; i++){
		var deg = 0,
			tempvar = graphData[i].count;

		percArray[i] = (graphData[i].count/pdata.total)*100;
		if(percArray[i]==100){
			this.isFullCircle = colors[i];
		}
		for(let j=0; j<=i; j++){
			deg += percArray[j];
		}
		deg=deg*3.6;
		var largeArc = percArray[i]>50 ? 1 : 0,
		x = cx+r*(Math.cos(deg*Math.PI/180)),
		y = cy+r*(Math.sin(deg*Math.PI/180));

		path = 'M'+cx+','+cy+' L'+px+','+py+' A'+r+','+r+',0,'+largeArc+',1,'+x+','+y;
		pathArray.push({
			path:path,
			dataValue:tempvar,
			color:colors[i],
			cssClass: "svg-path-"+i
		});
		px = x; py = y;
	}
	this.svgpath = pathArray;

	removeScaledClass();

	}
}
var debounce = function(fn, delay){
		var timeout;
		return function(){
			var context = this;
			clearTimeout(timeout);
			timeout = setTimeout(()=>{
				fn.call(context);
			}, delay);
		}
	}

var removeScaledClass = debounce(()=>{
	var svgArray = document.querySelectorAll('.svg-wrap');
	[].forEach.call(svgArray, (svg)=>{
		svg.classList.remove('scaled')
	});
	setupMouseOver();
},600);

var setupMouseOver = ()=>{
	var svg = document.querySelectorAll('.pie-chart path');
		[].forEach.call(svg, (item)=>{
			item.addEventListener('mouseenter', function(e){
				removePath();
				var el = item.cloneNode(true),
					arcpath = el.getAttribute("d").split(' L');
					
				arcpath = 'M'+arcpath[1];
				el.setAttribute("d",arcpath);
				el.setAttribute("stroke", el.getAttribute("fill"));
				el.setAttribute("fill", 'transparent');
				el.setAttribute("id", 'hoverpath');
				el.setAttribute("stroke-width", "15px");
				el.style.strokeOpacity = .5
				item.parentNode.appendChild(el);
				
			});
			item.addEventListener('mouseleave', ()=>{
				removePath();
			});
	});
		
}
function removePath(){
	var removePath = document.getElementById('hoverpath');
	if(removePath)removePath.parentNode.removeChild(removePath);
	return false;
}
class SVGPath{
	path: string;
	dataValue: any;
	color:any;
}
