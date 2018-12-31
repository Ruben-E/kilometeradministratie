import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Ride} from "../ride";
import {Preset} from "../preset";
import {PresetService} from "../preset.service";

@Component({
  selector: 'app-preset-picker',
  templateUrl: './preset-picker.component.html',
  styleUrls: ['./preset-picker.component.scss']
})
export class PresetPickerComponent implements OnInit {

  @Input() sheetId: string;
  @Output() selected = new EventEmitter<Preset>();

  presets: Preset[] = [];
  loading: boolean = true;
  error: boolean = false;

  constructor(private presetService: PresetService) {
  }

  ngOnInit() {
    this.getPresets();
  }

  getPresets() {
    this.loading = true;
    this.presetService.getPresets(this.sheetId).subscribe(presets => {
      this.presets = presets;
      this.loading = false;
    }, error => {
      this.loading = false;
      this.error = true;
    })
  }

  presetSelected(preset: Preset) {
    this.selected.emit(preset);
  }
}
