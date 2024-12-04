<script lang="ts">
	import { PASS_RADIUS, SVG_OFFSET } from '../_utilities/const';
	import { metaContext } from '../_utilities/contexts';
	import { getPassColor } from '../_utilities/jammer-passes-tracker';
	import type { Pass } from '../_utilities/types';

	export let pass: Pass;

	const meta = metaContext.get();
	$: color = getPassColor(pass, $meta.setup) ?? 'red';
</script>

<circle
	cx={`${pass.x * 100}%`}
	cy={`${pass.y * 100}%`}
	fill={color}
	r={PASS_RADIUS}
	transform={`translate(-${SVG_OFFSET}, -${SVG_OFFSET})`}
	on:click
/>
