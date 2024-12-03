<script lang="ts">
	import { PASS_RADIUS, SVG_OFFSET } from '../_utilities/const';
	import type { RelativeCoordinate } from '../_utilities/types';

	export let coord: RelativeCoordinate;
</script>

<circle
	cx={`${coord.x * 100}%`}
	cy={`${coord.y * 100}%`}
	fill="red"
	r={PASS_RADIUS}
	transform={`translate(-${SVG_OFFSET}, -${SVG_OFFSET})`}
	on:click
/>
