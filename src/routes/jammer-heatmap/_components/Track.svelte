<script lang="ts">
	import { SVG_OFFSET } from '../_utilities/const';

	export let trackElement: HTMLImageElement;
</script>

<svg
	on:click
	bind:this={trackElement}
	id="track"
	xmlns="http://www.w3.org/2000/svg"
	version="1.1"
	preserveAspectRatio="xMidYMid meet"
	viewBox={`-${SVG_OFFSET} -${SVG_OFFSET} 980 650`}
	xmlns:xlink="http://www.w3.org/1999/xlink"
	xmlns:nurds="nurds"
	background="white"
	display="block"
	width="100%"
	height="100%"
>
	<!-- normal box is 0 0 880 550 but we want some padding -->

	<defs>
		<!-- (0,0) is the top left corner; track centre is at (440, 275) -->
		<path
			id="trackpath"
			d="
                   M 265,550
                   L 615,530
                   A 265,265 0 1,0 615,0
                   L 265,20
                   A 265,265 0 1,0 265,550
                   M 265,400
                   L 615,400
                   A 125,125 0 1,0 615,150
                   L 265,150
                   A 125,125 0 1,0 265,400
                   "
		></path>

		<line x1="0" y1="-35" x2="0" y2="-105" id="tenFootMark"></line>
	</defs>

	<use
		xlink:href="#trackpath"
		id="trackBackground"
		class="trackBackground"
		x="0"
		y="0"
		stroke="none"
		fill="orange"
		fill-opacity="0"
		stroke-width="0px"
		fill-rule="evenodd"
	></use>
	<path
		class="trackBoundary"
		id="pivotLine"
		d="
                 M 265,150
                 L 265,20
                 "
		stroke="rgb(18, 52, 187)"
		fill="orange"
		fill-opacity="0"
		stroke-width="4px"
		fill-rule="evenodd"
	></path>
	<path
		class="trackBoundary"
		id="jammerLine"
		d="
                 M 565,150
                 L 565,4
                 "
		stroke="rgb(18, 52, 187)"
		fill="orange"
		fill-opacity="0"
		stroke-width="4px"
		fill-rule="evenodd"
	></path>
	<use
		xlink:href="#trackpath"
		id="trackBoundary"
		class="trackBoundary"
		x="0"
		y="0"
		stroke="rgb(18, 52, 187)"
		fill="orange"
		fill-opacity="0"
		stroke-width="4px"
		fill-rule="evenodd"
	></use>

	<g id="tenFootMarks" class="mark" stroke="rgb(170, 170, 170)" fill="none" stroke-width="1.5px">
		<!-- first straightaway -->
		<use xlink:href="#tenFootMark" class="mark" x="365" y="150"></use>
		<use xlink:href="#tenFootMark" class="mark" x="465" y="150"></use>
		<!-- second straightaway -->
		<use xlink:href="#tenFootMark" class="mark" x="615" y="400" transform="rotate(180, 615, 400)"
		></use>
		<use xlink:href="#tenFootMark" class="mark" x="515" y="400" transform="rotate(180, 515, 400)"
		></use>
		<use xlink:href="#tenFootMark" class="mark" x="415" y="400" transform="rotate(180, 415, 400)"
		></use>
		<use xlink:href="#tenFootMark" class="mark" x="315" y="400" transform="rotate(180, 315, 400)"
		></use>
		<!-- first curve -->
		<use
			xlink:href="#tenFootMark"
			class="mark"
			x="265"
			y="150"
			transform="rotate(-32.719403590194666, 265, 275)"
		></use>
		<use
			xlink:href="#tenFootMark"
			class="mark"
			x="265"
			y="150"
			transform="rotate(-65.438807180389333, 265, 275)"
		></use>
		<use
			xlink:href="#tenFootMark"
			class="mark"
			x="265"
			y="150"
			transform="rotate(-98.158210770583992, 265, 275)"
		></use>
		<use
			xlink:href="#tenFootMark"
			class="mark"
			x="265"
			y="150"
			transform="rotate(-130.87761436077867, 265, 275)"
		></use>
		<use
			xlink:href="#tenFootMark"
			class="mark"
			x="265"
			y="150"
			transform="rotate(-163.59701795097334, 265, 275)"
		></use>
		<!-- second curve -->
		<use
			xlink:href="#tenFootMark"
			class="mark"
			x="615"
			y="150"
			transform="rotate(147.28059640980533, 615, 275)"
		></use>
		<use
			xlink:href="#tenFootMark"
			class="mark"
			x="615"
			y="150"
			transform="rotate(114.56119281961067, 615, 275)"
		></use>
		<use
			xlink:href="#tenFootMark"
			class="mark"
			x="615"
			y="150"
			transform="rotate(81.841789229416008, 615, 275)"
		></use>
		<use
			xlink:href="#tenFootMark"
			class="mark"
			x="615"
			y="150"
			transform="rotate(49.122385639221335, 615, 275)"
		></use>
		<use
			xlink:href="#tenFootMark"
			class="mark"
			x="615"
			y="150"
			transform="rotate(16.402982049026662, 615, 275)"
		></use>
	</g>

	<slot></slot>
</svg>
