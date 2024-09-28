TARGET=$(addprefix migrate-,local remote)

.PHONY: generate
generate:
	npx prisma generate

.PHONY: $(TARGET)
$(TARGET): migrate-%:
	npx wrangler d1 migrations apply cloudflarepages --$*
