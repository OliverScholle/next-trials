import { PrismaClient } from "@prisma/client";

// Static method interpretation for javascript
// Get the singleton context with the prisma client by calling
// Ex: const ctx = Context.getInstance();
export default (() => {
    class Context 
    {
        constructor() {
            this.prisma = new PrismaClient();
        }
    }

    return {
        getInstance() {
            if (!Context.instance) {
                Context.instance = new Context();
            }
            return Context.instance;
        }
    };
})();