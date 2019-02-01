"use strict";
/**
 * Created by user on 2018/4/19/019.
 */
Object.defineProperty(exports, "__esModule", { value: true });
class AbstractTableDictCore {
    constructor(type, options = {}, existsTable, ...argv) {
        this.TABLE = {};
        this.TABLE2 = {};
        this.type = type;
        this.options = Object.assign({}, this.options, options);
        if (existsTable) {
            if (existsTable.TABLE) {
                this.TABLE = existsTable.TABLE;
            }
            if (existsTable.TABLE2) {
                this.TABLE2 = existsTable.TABLE2;
            }
        }
    }
    _exists(data, ...argv) {
        let w, p, f;
        if (typeof data == 'string') {
            w = data;
        }
        else if (Array.isArray(data)) {
            [w, p, f] = data;
        }
        else {
            ({ w, p, f } = data);
        }
        return w;
    }
    exists(data, ...argv) {
        let w = this._exists(data);
        return this.TABLE[w] || null;
    }
    size() {
        return Object.keys(this.TABLE).length;
    }
}
exports.AbstractTableDictCore = AbstractTableDictCore;
exports.default = AbstractTableDictCore;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29yZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImNvcmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBOztHQUVHOztBQTRCSCxNQUFzQixxQkFBcUI7SUFVMUMsWUFBWSxJQUFZLEVBQUUsVUFBb0IsRUFBRSxFQUFFLFdBQXNDLEVBQUUsR0FBRyxJQUFJO1FBTDFGLFVBQUssR0FBYSxFQUFFLENBQUM7UUFDckIsV0FBTSxHQUFvQixFQUFFLENBQUM7UUFNbkMsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7UUFFakIsSUFBSSxDQUFDLE9BQU8sR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRSxJQUFJLENBQUMsT0FBTyxFQUFFLE9BQU8sQ0FBQyxDQUFDO1FBRXhELElBQUksV0FBVyxFQUNmO1lBQ0MsSUFBSSxXQUFXLENBQUMsS0FBSyxFQUNyQjtnQkFDQyxJQUFJLENBQUMsS0FBSyxHQUFHLFdBQVcsQ0FBQyxLQUFLLENBQUM7YUFDL0I7WUFFRCxJQUFJLFdBQVcsQ0FBQyxNQUFNLEVBQ3RCO2dCQUNDLElBQUksQ0FBQyxNQUFNLEdBQUcsV0FBVyxDQUFDLE1BQU0sQ0FBQzthQUNqQztTQUNEO0lBQ0YsQ0FBQztJQUVTLE9BQU8sQ0FBc0MsSUFBTyxFQUFFLEdBQUcsSUFBSTtRQUV0RSxJQUFJLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBRVosSUFBSSxPQUFPLElBQUksSUFBSSxRQUFRLEVBQzNCO1lBQ0MsQ0FBQyxHQUFHLElBQUksQ0FBQztTQUNUO2FBQ0ksSUFBSSxLQUFLLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxFQUM1QjtZQUNDLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUM7U0FDakI7YUFFRDtZQUNDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxHQUFHLElBQWEsQ0FBQyxDQUFDO1NBQzlCO1FBRUQsT0FBTyxDQUFDLENBQUE7SUFDVCxDQUFDO0lBRU0sTUFBTSxDQUFzQyxJQUFPLEVBQUUsR0FBRyxJQUFJO1FBRWxFLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7UUFFM0IsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxJQUFJLElBQUksQ0FBQztJQUM5QixDQUFDO0lBWU0sSUFBSTtRQUVWLE9BQU8sTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsTUFBTSxDQUFDO0lBQ3ZDLENBQUM7Q0FDRDtBQXZFRCxzREF1RUM7QUFFRCxrQkFBZSxxQkFBcUIsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQ3JlYXRlZCBieSB1c2VyIG9uIDIwMTgvNC8xOS8wMTkuXG4gKi9cblxuaW1wb3J0IHsgSVdvcmQgfSBmcm9tICcuLi9TZWdtZW50JztcbmltcG9ydCB7IElEaWN0Um93IH0gZnJvbSAnc2VnbWVudC1kaWN0L2xpYi9sb2FkZXIvc2VnbWVudCc7XG5pbXBvcnQgQ2prQ29udiBmcm9tICdjamstY29udic7XG5pbXBvcnQgeyB0ZXh0X2xpc3QgfSBmcm9tICcuLi91dGlsL2Nqayc7XG5pbXBvcnQgeyBJVGFibGVEaWN0Um93IH0gZnJvbSAnLi9kaWN0JztcblxuZXhwb3J0IHR5cGUgSU9wdGlvbnMgPSB7XG5cdGF1dG9Dams/OiBib29sZWFuLFxufVxuXG5leHBvcnQgaW50ZXJmYWNlIElESUNUPFQgPSBhbnk+XG57XG5cdFtrZXk6IHN0cmluZ106IFQsXG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgSURJQ1QyPFQgPSBhbnk+XG57XG5cdFtrZXk6IG51bWJlcl06IElESUNUPFQ+LFxufVxuXG5leHBvcnQgaW50ZXJmYWNlIElUYWJsZURpY3RFeGlzdHNUYWJsZTxUPlxue1xuXHRUQUJMRT86IElESUNUPFQ+LFxuXHRUQUJMRTI/OiBhbnkgfCBJRElDVDI8VD4sXG59XG5cbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBBYnN0cmFjdFRhYmxlRGljdENvcmU8VD5cbntcblx0cHVibGljIHN0YXRpYyB0eXBlOiBzdHJpbmc7XG5cdHB1YmxpYyB0eXBlOiBzdHJpbmc7XG5cblx0cHVibGljIFRBQkxFOiBJRElDVDxUPiA9IHt9O1xuXHRwdWJsaWMgVEFCTEUyOiBhbnkgfCBJRElDVDI8VD4gPSB7fTtcblxuXHRwdWJsaWMgb3B0aW9uczogSU9wdGlvbnM7XG5cblx0Y29uc3RydWN0b3IodHlwZTogc3RyaW5nLCBvcHRpb25zOiBJT3B0aW9ucyA9IHt9LCBleGlzdHNUYWJsZT86IElUYWJsZURpY3RFeGlzdHNUYWJsZTxUPiwgLi4uYXJndilcblx0e1xuXHRcdHRoaXMudHlwZSA9IHR5cGU7XG5cblx0XHR0aGlzLm9wdGlvbnMgPSBPYmplY3QuYXNzaWduKHt9LCB0aGlzLm9wdGlvbnMsIG9wdGlvbnMpO1xuXG5cdFx0aWYgKGV4aXN0c1RhYmxlKVxuXHRcdHtcblx0XHRcdGlmIChleGlzdHNUYWJsZS5UQUJMRSlcblx0XHRcdHtcblx0XHRcdFx0dGhpcy5UQUJMRSA9IGV4aXN0c1RhYmxlLlRBQkxFO1xuXHRcdFx0fVxuXG5cdFx0XHRpZiAoZXhpc3RzVGFibGUuVEFCTEUyKVxuXHRcdFx0e1xuXHRcdFx0XHR0aGlzLlRBQkxFMiA9IGV4aXN0c1RhYmxlLlRBQkxFMjtcblx0XHRcdH1cblx0XHR9XG5cdH1cblxuXHRwcm90ZWN0ZWQgX2V4aXN0czxVIGV4dGVuZHMgSVdvcmQgfCBJRGljdFJvdyB8IHN0cmluZz4oZGF0YTogVSwgLi4uYXJndilcblx0e1xuXHRcdGxldCB3LCBwLCBmO1xuXG5cdFx0aWYgKHR5cGVvZiBkYXRhID09ICdzdHJpbmcnKVxuXHRcdHtcblx0XHRcdHcgPSBkYXRhO1xuXHRcdH1cblx0XHRlbHNlIGlmIChBcnJheS5pc0FycmF5KGRhdGEpKVxuXHRcdHtcblx0XHRcdFt3LCBwLCBmXSA9IGRhdGE7XG5cdFx0fVxuXHRcdGVsc2Vcblx0XHR7XG5cdFx0XHQoeyB3LCBwLCBmIH0gPSBkYXRhIGFzIElXb3JkKTtcblx0XHR9XG5cblx0XHRyZXR1cm4gd1xuXHR9XG5cblx0cHVibGljIGV4aXN0czxVIGV4dGVuZHMgSVdvcmQgfCBJRGljdFJvdyB8IHN0cmluZz4oZGF0YTogVSwgLi4uYXJndilcblx0e1xuXHRcdGxldCB3ID0gdGhpcy5fZXhpc3RzKGRhdGEpO1xuXG5cdFx0cmV0dXJuIHRoaXMuVEFCTEVbd10gfHwgbnVsbDtcblx0fVxuXG5cdHB1YmxpYyBhYnN0cmFjdCBhZGQoZGF0YSwgLi4uYXJndik6IHRoaXNcblxuXHRwcm90ZWN0ZWQgYWJzdHJhY3QgX2FkZChkYXRhLCAuLi5hcmd2KVxuXG5cdHB1YmxpYyByZW1vdmU/KGRhdGEsIC4uLmFyZ3YpOiB0aGlzXG5cdHByb3RlY3RlZCBfcmVtb3ZlPyhkYXRhLCAuLi5hcmd2KVxuXG5cdHB1YmxpYyBqc29uPyguLi5hcmd2KTogSURJQ1Q8VD5cblx0cHVibGljIHN0cmluZ2lmeT8oLi4uYXJndik6IHN0cmluZ1xuXG5cdHB1YmxpYyBzaXplKCk6IG51bWJlclxuXHR7XG5cdFx0cmV0dXJuIE9iamVjdC5rZXlzKHRoaXMuVEFCTEUpLmxlbmd0aDtcblx0fVxufVxuXG5leHBvcnQgZGVmYXVsdCBBYnN0cmFjdFRhYmxlRGljdENvcmU7XG4iXX0=