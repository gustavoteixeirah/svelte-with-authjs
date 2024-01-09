import { WebTracerProvider } from '@opentelemetry/sdk-trace-web';
import { BatchSpanProcessor } from '@opentelemetry/sdk-trace-base';
import { ZoneContextManager } from '@opentelemetry/context-zone';
import { Resource, detectResources, browserDetector } from '@opentelemetry/resources';
import { SemanticResourceAttributes } from '@opentelemetry/semantic-conventions';
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-http';

import { registerInstrumentations } from '@opentelemetry/instrumentation';
import { getWebAutoInstrumentations } from '@opentelemetry/auto-instrumentations-web';

const aspectoToken = '';
const serviceName = 'sveltekit';

// in order to propagate the context to your instrumented services, add their urls by matching a regex
const propagateTraceHeaderCorsUrls = [/my\.company\.domain/];

// urls that match any regex in ignoreUrls will not be traced and the context will not be propagate.
// it can be used to exclude uninteresting spans from the traces, avoid CORS issues, and ignore third party API calls
const ignoreUrls = [/third\.parties.\urls/];

export const registerOpenTelemetry = async () => {
	const autoResource = await detectResources({
		detectors: [browserDetector],
	});

	const resource = new Resource({
		[SemanticResourceAttributes.SERVICE_NAME]: serviceName,
	}).merge(autoResource);

	const provider = new WebTracerProvider({
		resource,
	});

	const aspectoExporter = new OTLPTraceExporter({
		url: 'https://otelcol.aspecto.io/v1/traces',
		headers: {
			Authorization: aspectoToken,
		},
	});
	provider.addSpanProcessor(new BatchSpanProcessor(aspectoExporter));

	provider.register({
		contextManager: new ZoneContextManager(),
	});

	const instrumentations = getWebAutoInstrumentations({
		// load custom configuration for xml-http-request instrumentation
		'@opentelemetry/instrumentation-xml-http-request': {
			propagateTraceHeaderCorsUrls,
			ignoreUrls,
		},
	});
	console.log("was here")
	registerInstrumentations({
		instrumentations,
	});
};